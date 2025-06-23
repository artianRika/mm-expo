import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {CurrencyContext} from "@/contexts/currencyContext";
import UpdateCurrencyDialog from "@/components/dialogs/UpdateCurrencyDialog";
import AddTransactionDialog from "@/components/dialogs/AddTransactionDialog";


export const BalanceCard = () => {
    const { selectedCurrency } = useContext(CurrencyContext);


    const [editAmountAlertOpen, setEditAmountAlertOpen] = useState(false);
    const openEditDialog = () => setEditAmountAlertOpen(true);
    const closeEditDialog = () => setEditAmountAlertOpen(false);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [type, setType] = useState('Expense');

    return (
        <View style={styles.outerContainer}>
            <View style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.currencyName}>
                        { selectedCurrency.currency_name }
                    </Text>
                    <Pressable onPress={openEditDialog}>
                        <MaterialIcons name="edit" size={24} color="black" />
                    </Pressable>
                </View>

                <UpdateCurrencyDialog
                    visible={editAmountAlertOpen}
                    onDismiss={closeEditDialog}
                />

                <Text style={styles.amountText}>
                    {selectedCurrency.amount + " " + selectedCurrency.currency}
                </Text>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <Pressable
                        onPress={() => {
                            setType('Income');
                            setDialogVisible(true)
                        }}
                    >
                        <MaterialIcons name="add-circle-outline" size={40} color="black" />
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            setType('Expense');
                            setDialogVisible(true)
                        }}
                    >
                        <MaterialIcons
                            name="remove-circle-outline"
                            size={40}
                            color="black"
                        />
                    </Pressable>
                </View>

            </View>
                <AddTransactionDialog
                    visible={dialogVisible}
                    onDismiss={() => setDialogVisible(false)}
                    type={type}
                    setType={setType}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 23,
        marginBottom: 20
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
        fontSize: 26,
        fontWeight: '500',
        color: 'black',

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
