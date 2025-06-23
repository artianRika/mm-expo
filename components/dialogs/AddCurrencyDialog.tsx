import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { CurrencyContext } from '../../contexts/currencyContext';
import { supabase } from '../../lib/supabase';

export default function AddCurrencyDialog({ visible, onDismiss }) {
    const { getCurrencies } = useContext(CurrencyContext);

    const [currency, setCurrency] = useState('');
    const [currencyName, setCurrencyName] = useState('Savings...');
    const [amount, setAmount] = useState('');

    const addCurrency = async () => {
        if (currency === '') return;

        const { error } = await supabase.from('Currencies').insert([
            {
                user_id: '68c52304-7c95-4791-a6b5-33c29068c6dc', // TODO: replace with actual user id
                amount: Number(amount),
                currency,
                currency_name: currencyName,
            },
        ]);

        if (error) {
            console.error('Insert error:', error);
        } else {
            getCurrencies('last');
            onDismiss();
            setCurrency('');
            setCurrencyName('Savings...');
            setAmount('');
        }
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title>Add Currency</Dialog.Title>
                <Dialog.Content>
                    <Picker
                        selectedValue={currency}
                        onValueChange={setCurrency}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select currency..." value="" />
                        <Picker.Item label="MKD" value="MKD" />
                        <Picker.Item label="EUR" value="EUR" />
                        <Picker.Item label="USD" value="USD" />
                        <Picker.Item label="CHF" value="CHF" />
                        <Picker.Item label="ALL" value="ALL" />
                    </Picker>

                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={currencyName}
                        onChangeText={setCurrencyName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>Cancel</Button>
                    <Button onPress={addCurrency}>Add</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({

    picker: {
        height: 50,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        color: '#000',
        backgroundColor: '#fff',
    },

});
