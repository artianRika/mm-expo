import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

// import { UserContext } from "../../contexts/userContext";
import {CurrencyContext} from "@/contexts/currencyContext";
import {supabase} from "@/lib/supabase";

export const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
    // const { authUser } = useContext(UserContext);
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
            .eq("Currencies.user_id", '68c52304-7c95-4791-a6b5-33c29068c6dc') //TODO: authUser?.id
            .order("created_at", { ascending: false });

        if (error) {
            console.log("Error fetching transactions:", error);
        } else {
            setTransactions(data);
        }
    }, [selectedCurrency?.currency_id, fromDate, toDate]); //TODO: authUser?.id

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
