import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, Button, Paragraph } from 'react-native-paper';
import { CurrencyContext } from '../../contexts/currencyContext';
import { supabase } from '../../lib/supabase';

export default function DeleteCurrencyDialog({ visible, onDismiss, currencyToDelete }) {
    const { getCurrencies, setSelectedCurrency } = useContext(CurrencyContext);

    const handleDelete = async () => {
        if (!currencyToDelete) return;

        const { error } = await supabase
            .from('Currencies')
            .delete()
            .eq('currency_id', currencyToDelete.currency_id);

        if (error) {
            console.error('Error deleting currency:', error.message);
        } else {
            await getCurrencies("last");
        }

        onDismiss();
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title>Delete Currency</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>
                        Are you sure you want to delete{' '}
                        {currencyToDelete?.currency_name}
                    </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>Cancel</Button>
                    <Button onPress={handleDelete} textColor="red">
                        Delete
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    strong: {
        fontWeight: 'bold',
    },
});
