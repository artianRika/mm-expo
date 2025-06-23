import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import {supabase} from "@/lib/supabase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getInitialSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (data.session) {
                setAuthUser(data.session.user);
                await AsyncStorage.setItem("my_app_token", data.session.access_token);
            }
            setLoading(false);
        };

        getInitialSession();

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    setAuthUser(session.user);
                    await AsyncStorage.setItem("my_app_token", session.access_token);
                } else {
                    setAuthUser(null);
                    await AsyncStorage.removeItem("my_app_token");
                }
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!authUser?.id) return;

            const { data, error } = await supabase
                .from("Users")
                .select("*")
                .eq("user_id", authUser.id)
                .maybeSingle();

            if (!error) {
                setUser(data);
            }
        };

        fetchUserData();
    }, [authUser]);

    const signOut = async () => {
        await supabase.auth.signOut();
        setAuthUser(null);
        setUser(null);
        await AsyncStorage.removeItem("my_app_token");
        router.replace("/auth/login");
    };

    const isLoggedIn = () => {
        return !!authUser;
    };

    return (
        <UserContext.Provider
            value={{
                authUser,
                user,
                isLoggedIn,
                signOut,
                loading,
            }}
        >
            {!loading && children}
        </UserContext.Provider>
    );
};
