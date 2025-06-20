import React, { useContext, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Picker,
    Platform,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { CurrencyContext } from '../../contexts/currencyContext.tsx';
// import { UserContext } from '../Context/UserContext';

export default function AddCurrencyDialog({ addCurrencyAlertOpen, onAddCurrencyAlertClose }) {
    const { getCurrencies } = useContext(CurrencyContext);
    // const { authUser } = useContext(UserContext);

    const [currency, setCurrency] = useState('');
    const [currencyName, setCurrencyName] = useState('Savings...');
    const [amount, setAmount] = useState(0);

    const addCurrency = async () => {
        if (currency !== '') {
            const { data, error } = await supabase
                .from('Currencies')
                .insert([
                    {
                        user_id: '68c52304-7c95-4791-a6b5-33c29068c6dc',   //TODO: authUser.id
                        amount,
                        currency,
                        currency_name: currencyName,
                    },
                ]);

            if (error) {
                console.error('Insert error:', error);
            } else {
                console.log('Inserted');
                getCurrencies('last');
                onAddCurrencyAlertClose();
                setCurrency('');
                setCurrencyName('Savings...');
                setAmount(0);
            }
        }
    };

    return (
        <Modal
            visible={addCurrencyAlertOpen}
            animationType="slide"
            transparent
            onRequestClose={onAddCurrencyAlertClose}
        >
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>Add Currency</Text>

                    <View style={styles.formControl}>
                        <Text style={styles.label}>Currency</Text>
                        <Picker
                            selectedValue={currency}
                            onValueChange={(itemValue) => setCurrency(itemValue)}
                            style={Platform.OS === 'ios' ? styles.pickerIOS : styles.picker}
                        >
                            <Picker.Item label="Select currency..." value="" />
                            <Picker.Item label="MKD" value="MKD" />
                            <Picker.Item label="EUR" value="EUR" />
                            <Picker.Item label="USD" value="USD" />
                            <Picker.Item label="CHF" value="CHF" />
                            <Picker.Item label="ALL" value="ALL" />
                        </Picker>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={currencyName}
                        onChangeText={setCurrencyName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        value={amount.toString()}
                        onChangeText={(val) => setAmount(Number(val))}
                        keyboardType="numeric"
                    />

                    <View style={styles.actions}>
                        <TouchableOpacity onPress={onAddCurrencyAlertClose} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={addCurrency} style={styles.addButton}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '90%',
    },
    title: {
        fontSize: 18,
        marginBottom: 16,
        fontWeight: '600',
    },
    formControl: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    picker: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    pickerIOS: {
        height: 150,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    cancelButton: {
        padding: 10,
        marginRight: 8,
    },
    addButton: {
        padding: 10,
        backgroundColor: '#c1c1c1',
        borderRadius: 6,
    },
    buttonText: {
        fontWeight: '500',
        color: '#000',
    },
});
