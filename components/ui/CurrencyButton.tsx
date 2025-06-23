import React from 'react';
import {Pressable, Text, Image, StyleSheet, View, Appearance} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CurrencyButton({ currency, currencyName, onPress, onPressMore }) {

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

                {/* Three dots icon for more actions */}
                {onPressMore && (
                    <Pressable onPress={onPressMore} style={styles.moreButton} hitSlop={10}>
                        <MaterialIcons name="more-vert" size={24} color="black" />
                    </Pressable>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({

    button: {
        minHeight: 48,
        paddingHorizontal: 20,
        marginHorizontal: 16,
        marginVertical: 8,
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
        justifyContent: 'space-between',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    text: {
        fontSize: 16,
        color: 'black',
        flex: 1,
    },
    moreButton: {
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
