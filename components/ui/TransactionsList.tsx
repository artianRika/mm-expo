import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView, Text as RNText } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { TransactionsContext } from '@/contexts/transactionContext';

export default function TransactionsList() {
    const { transactions } = useContext(TransactionsContext);

    if (!transactions || transactions.length === 0) {
        return <Text style={styles.emptyText}>No transactions available</Text>;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
                <DataTable style={styles.dataTable}>
                    <DataTable.Header>
                        <DataTable.Title style={styles.dateColumn}>Date</DataTable.Title>
                        <DataTable.Title style={styles.descColumn}>Description</DataTable.Title>
                        <DataTable.Title numeric style={styles.amountColumn}>
                            Amount
                        </DataTable.Title>
                    </DataTable.Header>

                    {transactions.map((item, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell style={styles.dateColumn}>
                                {new Date(item.created_at).toLocaleDateString()}
                            </DataTable.Cell>

                            <DataTable.Cell style={styles.descColumn}>
                                <RNText style={item.transaction_type === 'Income' ? styles.income : styles.expense}>
                                    {item.description}
                                </RNText>
                            </DataTable.Cell>

                            <DataTable.Cell numeric style={styles.amountColumn}>
                                <RNText style={item.transaction_type === 'Income' ? styles.income : styles.expense}>
                                    {item.transaction_amount}
                                </RNText>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        flex: 1,
        width: '100%',
    },
    dataTable: {
        width: '100%',
    },
    dateColumn: {
        flex: 1,
    },
    descColumn: {
        flex: 2,
    },
    amountColumn: {
        flex: 1,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    income: {
        color: 'green',
    },
    expense: {
        color: 'red',
    },
});
