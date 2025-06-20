import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    useColorScheme,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function AccountScreen() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    const user = {
        name: 'Artian',
        surname: 'Rika',
        profilePic: 'https://i.pravatar.cc/150?img=3',
        currencyCount: 5,
        weeklyTransactions: 12,
    };

    const backgroundColor = Colors[colorScheme ?? 'light'].background;
    const textColor = Colors[colorScheme ?? 'light'].text;

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.content}>
                <Image source={{ uri: user.profilePic }} style={styles.avatar} />
                <Text style={[styles.name, { color: textColor }]}>
                    {user.name} {user.surname}
                </Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={[styles.statNumber, { color: textColor }]}>{user.currencyCount}</Text>
                        <Text style={[styles.statLabel, { color: textColor }]}>Currencies</Text>
                    </View>

                    <View style={styles.statBox}>
                        <Text style={[styles.statNumber, { color: textColor }]}>{user.weeklyTransactions}</Text>
                        <Text style={[styles.statLabel, { color: textColor }]}>Transactions (7d)</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        justifyContent: 'space-between',
    },
    content: {
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 32,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 30,
    },
    statBox: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        marginTop: 4,
    },
    logoutButton: {
        marginBottom: 40,
        backgroundColor: '#e63946',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
