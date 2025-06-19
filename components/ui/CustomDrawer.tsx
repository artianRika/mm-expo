import {useNavigation} from "@react-navigation/native";
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {ActivityIndicator, Appearance, Pressable, StyleSheet, Text, View} from "react-native";
import CurrencyButton from "@/components/ui/CurrencyButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";

export function CustomDrawerContent(props) {

    Appearance.getColorScheme = () => 'light';
    const navigation = useNavigation();

    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCurrencies = async () => {
        const { data, error } = await supabase.from('Currencies').select('*');

        if (error) {
            console.error('Error fetching currencies:', error.message);
        } else {
            setCurrencies(data);
            console.log(data)
        }

        setLoading(false);
    };


    useEffect(() => {
        fetchCurrencies();
    }, []);

    if (loading) return <ActivityIndicator size="large" />;

    // const currencies = [
    //     { id: '1', name: 'Euro', symbol: '€' },
    //     { id: '2', name: 'Dollar', symbol: '$' },
    //     { id: '3', name: 'Bitcoin', symbol: '₿' },
    // ];

    return (
        <DrawerContentScrollView {...props} style={{backgroundColor: 'white'}}>
            <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black" }}>Currencies</Text>
            </View>

            {currencies.map((currency) => (
                <CurrencyButton
                    currency={currency.currency}
                    currencyName={currency.currency_name}
                    onPress={() => console.log('Euro clicked')}
                />
            ))}

            {/*<DrawerItem*/}
            {/*    label="Add Currency"*/}
            {/*    onPress={() => alert('Add Currency pressed')}*/}
            {/*    labelStyle={{ color: 'black', fontWeight: 'bold' }}*/}
            {/*/>*/}

            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
                // onPress={onPress}
            >
                <View style={styles.iconContainer}>
                    <MaterialIcons name="add" size={24} color="black" />
                </View>
                <Text style={styles.text}>Add currency</Text>
            </Pressable>

        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({


    button: {
        minHeight: 48,
        paddingHorizontal: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.3,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    buttonPressed: {
        backgroundColor: '#C8E6C9',
        borderColor: '#D0EBD1',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    text: {
        flexGrow: 1,
        fontSize: 16,
        color: 'black',
    },

})