import {Appearance, StyleSheet, View} from "react-native";
import React, {useEffect} from "react";
import BalanceCard from "@/components/ui/BalanceCard";

export function CurrencyScreen({ route }) {

    Appearance.getColorScheme = () => 'light';
    // const { currency } = route.params || { currency: { name: 'Select currency', symbol: '' } };




    return (
        <View style={styles.screen}>
            <BalanceCard/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white' },
    title: { fontSize: 28, fontWeight: 'bold' },
    symbol: { fontSize: 22, marginTop: 10 },
})