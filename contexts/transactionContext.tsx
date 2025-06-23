import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import {CurrencyContext} from "@/contexts/currencyContext";
import {supabase} from "@/lib/supabase";
import {UserContext} from "@/contexts/UserContext";

export const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
    const { authUser } = useContext(UserContext);
    const { selectedCurrency, currencyList } = useContext(CurrencyContext);

    const [transactions, setTransactions] = useState([]);
    const [fromDate, setFromDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1)); // start of month
    const [toDate, setToDate] = useState(new Date());

    const getTransactions = useCallback(async () => {
        if (!selectedCurrency?.currency_id) return;

        const { data, error } = await supabase
            .from("Transactions")
            .select(
                `
        *,
        Currencies (
          *,
          Users (
            *
          )
        )
      `
            )
            .eq("currency_id", selectedCurrency.currency_id)
            .eq("Currencies.user_id", authUser?.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.log("Error fetching transactions:", error);
        } else {
            setTransactions(data);
        }
    }, [selectedCurrency?.currency_id, authUser, fromDate, toDate]);

    useEffect(() => {
        getTransactions();
    }, [selectedCurrency, fromDate, toDate, currencyList]);

    return (
        <TransactionsContext.Provider
            value={{
                transactions,
                fromDate,
                setFromDate,
                toDate,
                setToDate,
                getTransactions,
            }}
        >
            {children}
        </TransactionsContext.Provider>
    );
};
