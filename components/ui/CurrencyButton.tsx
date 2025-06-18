import React from 'react';
import {Pressable, Text, Image, StyleSheet, View, useColorScheme} from 'react-native';

export default function CurrencyButton({ currency, currencyName, onPress }) {



    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    function getCurrencySymbolImage(currencyCode) {
        switch (currencyCode) {
            case 'MKD':
                return require('../../assets/icons/mkd_symbol.png');
            case 'EUR':
                return require('../../assets/icons/eur_symbol.png');
            case 'CHF':
                return require('../../assets/icons/chf_symbol.png');
            case 'ALL':
                return require('../../assets/icons/all_symbol.png');
            case 'USD':
                return require('../../assets/icons/usd_symbol.png');
        }
    }

    return (
        <Pressable
            style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            backgroundColor: isDark ? '#222' : '#fff',
            borderRadius: 8,
            marginVertical: 6,
        }}
           onPress={onPress}>
            <Image
                source={getCurrencySymbolImage(currency)}
                style={styles.icon}
                resizeMode="contain"
            />
            <Text style={styles.text}>{currencyName}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({

    icon: {
        width: 24,
        height: 24,
        marginRight: 12
    },
    text: {
        fontSize: 16,
        color: '#fff',
    },
});
