import React from 'react';
import {Pressable, Text, Image, StyleSheet, View, useColorScheme, Appearance} from 'react-native';

export default function CurrencyButton({ currency, currencyName, onPress }) {


    Appearance.getColorScheme = () => 'light';

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
            style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
            ]}
            onPress={onPress}
        >
            <View style={styles.content}>
                <Image
                    source={getCurrencySymbolImage(currency)}
                    style={styles.icon}
                    resizeMode="contain"
                />
                <Text style={styles.text}>{currencyName}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({

    button: {
        minHeight: 48,
        paddingHorizontal: 20, // similar to px: 2.5
        marginHorizontal: 16,  // ~1rem
        marginVertical: 8,     // ~.5rem
        backgroundColor: '#fff',
        borderWidth: 0.3,
        borderColor: '#ccc',
        borderRadius: 8,
        justifyContent: 'center',
        transitionDuration: '300ms',
    },
    buttonPressed: {
        backgroundColor: '#C8E6C9',
        borderColor: '#D0EBD1',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
});
