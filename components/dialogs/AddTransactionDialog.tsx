import React, {useContext, useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, Dialog, Portal, RadioButton, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {CurrencyContext} from '@/contexts/currencyContext';
import {supabase} from "@/lib/supabase";
import {TransactionsContext} from "@/contexts/transactionContext";

export default function AddTransactionDialog({ visible, onDismiss, type, setType }) {
    const { selectedCurrency, updateCurrency } = useContext(CurrencyContext);
    const { getTransactions } = useContext(TransactionsContext);

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        setDate(new Date());
        setDescription('');
        setAmount('');
    }, [visible]);

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const addTransaction = async () => {
        if (!description.trim()) return;

        try {
            const { data, error } = await supabase
                .from('Transactions')
                .insert([
                    {
                        currency_id: selectedCurrency.currency_id,
                        transaction_amount: Number(amount),
                        description,
                        created_at: date.toISOString(),
                        transaction_type: type,
                    },
                ]);

            if (error) {
                console.error('Transaction insert error:', error);
            } else {
                console.log('Transaction inserted', data);
                updateCurrency(Number(amount), type);
                getTransactions();
                onDismiss();
            }
        } catch (e) {
            console.error('Unexpected error:', e);
        }
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
                <Dialog.Title>Add Transaction</Dialog.Title>
                <Dialog.Content>
                    <RadioButton.Group
                        onValueChange={newValue => setType(newValue)}
                        value={type}
                    >
                        <View style={styles.radioRow}>
                            <RadioButton.Item label="Income" value="Income" />
                            <RadioButton.Item label="Expense" value="Expense" />
                        </View>
                    </RadioButton.Group>

                    <TextInput
                        label="Description"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                    />

                    <TextInput
                        label="Amount"
                        value={amount}
                        keyboardType="numeric"
                        onChangeText={text => setAmount(text.replace(/[^0-9.]/g, ''))}
                        style={styles.input}
                    />

                    <Button
                        mode="outlined"
                        onPress={() => setShowDatePicker(true)}
                        style={styles.dateButton}
                    >
                        {`Date: ${date.toLocaleDateString()}`}
                    </Button>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChangeDate}
                            maximumDate={new Date()}
                        />
                    )}
                </Dialog.Content>

                <Dialog.Actions>
                    <Button onPress={onDismiss}>Cancel</Button>
                    <Button onPress={addTransaction}>Add</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    dialog: {
        borderRadius: 9,
        marginHorizontal: 20,
    },
    radioRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 12,
    },
    input: {
        marginBottom: 12,
    },
    dateButton: {
        marginBottom: 12,
    },
});
