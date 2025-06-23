import React, { useContext, useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Dialog, Portal, Button, Text } from 'react-native-paper';
import { CurrencyContext } from '../../contexts/currencyContext';

export default function UpdateCurrencyDialog({ visible, onDismiss }) {
    const { selectedCurrency, updateCurrency, name, setName, amount, setAmount } = useContext(CurrencyContext);

    useEffect(() => {
        if (selectedCurrency) {
            setName(selectedCurrency.currency_name);
            setAmount(selectedCurrency.amount);
        }
    }, [selectedCurrency]);

    const onEdit = () => {
        updateCurrency();
        onDismiss();
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
                <Dialog.Title>Edit Amount</Dialog.Title>
                <Dialog.Content>
                    <View style={styles.form}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Name"
                        />
                        <Text style={styles.label}>Amount</Text>
                        <TextInput
                            style={styles.input}
                            value={amount ? amount.toString() : ''}
                            onChangeText={text => setAmount(Number(text))}
                            keyboardType="numeric"
                            placeholder="Amount"
                        />
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>Cancel</Button>
                    <Button mode="contained" onPress={onEdit} style={styles.editButton}>
                        Edit
                    </Button>
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
    form: {
        gap: 16,
    },
    label: {
        marginBottom: 4,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 12,
    },
    editButton: {
        backgroundColor: '#007AFF',
    },

});
