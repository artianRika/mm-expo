import {Appearance, StyleSheet, View} from "react-native";
import React, {useContext, useEffect} from "react";
import BalanceCard from "@/components/ui/BalanceCard";
import {CurrencyContext} from "@/contexts/currencyContext";

export function CurrencyScreen({ route }) {

    Appearance.getColorScheme = () => 'light';

    const {selectedCurrency } = useContext(CurrencyContext)


    const isEmpty = Object.keys(selectedCurrency).length === 0;

    return (
        <View style={styles.screen}>
            {
                !isEmpty &&
                <BalanceCard/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white' },
    title: { fontSize: 28, fontWeight: 'bold' },
    symbol: { fontSize: 22, marginTop: 10 },
})