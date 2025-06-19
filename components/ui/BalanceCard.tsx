import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const BalanceCard = () => {
    // const { selectedCurrency } = useContext(CurrencyContext);

    const [editAmountAlertOpen, setEditAmountAlertOpen] = useState(false);
    const [addTransactionAlertOpen, setTransactionAlertOpen] = useState(false);
    const [type, setType] = useState('Expense');

    return (
        <View style={styles.outerContainer}>
            <View style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.currencyName}>
                        currency namee
                        {/*{selectedCurrency.currency_name}*/}
                    </Text>
                    <Pressable onPress={() => setEditAmountAlertOpen(true)}>
                        <MaterialIcons name="edit" size={24} color="black" />
                    </Pressable>
                </View>

                {/*<UpdateCurrencyDialog*/}
                {/*    visible={editAmountAlertOpen}*/}
                {/*    onClose={() => setEditAmountAlertOpen(false)}*/}
                {/*/>*/}

                {/* Amount Display */}
                <Text style={styles.amountText}>
                    amount display
                    {/*{selectedCurrency.amount}*/}
                    {/*{selectedCurrency.currency}*/}
                </Text>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <Pressable
                        onPress={() => {
                            setType('Income');
                            setTransactionAlertOpen(true);
                        }}
                    >
                        <MaterialIcons name="add-circle-outline" size={40} color="black" />
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            setType('Expense');
                            setTransactionAlertOpen(true);
                        }}
                    >
                        <MaterialIcons
                            name="remove-circle-outline"
                            size={40}
                            color="black"
                        />
                    </Pressable>
                </View>

                {/*<AddTransactionDialog*/}
                {/*    type={type}*/}
                {/*    setType={setType}*/}
                {/*    visible={addTransactionAlertOpen}*/}
                {/*    onClose={() => setTransactionAlertOpen(false)}*/}
                {/*/>*/}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 40
    },
    card: {
        backgroundColor: '#D0EBD1',
        width: '90%',
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    currencyName: {
        fontSize: 16,
        fontWeight: '500',
    },
    amountText: {
        fontSize: 32,
        fontWeight: '600',
        paddingVertical: 24,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 24,
    },
});

export default BalanceCard;
