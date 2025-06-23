import {supabase} from "../lib/supabase.js";
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {UserContext} from "@/contexts/UserContext";

export const CurrencyContext = createContext();



export const CurrencyProvider = ({ children }) => {

    const { authUser } = useContext(UserContext)

    const [currencyList, setCurrencyList] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState({});

    const [numberOfCurrencies, setNumberOfCurrencies] = useState(0);
    const [numberOfTransactions, setNumberOfTransactions] = useState(0);

    const [name, setName] = useState(selectedCurrency.currency_name || "Name");
    const [amount, setAmount] = useState(selectedCurrency.amount || "Amount");

    useEffect(() => {
        if (!authUser?.id) return;

        getCurrencies()
        setSelectedCurrency([])
    }, [authUser])


    useEffect(() => {
        if (selectedCurrency) {
            setName(selectedCurrency?.currency_name || "");
            setAmount(selectedCurrency?.amount || 0);
        }
    }, [selectedCurrency]);


    useEffect(() => {
        getNumberOfCurrencies();
        getNumberOfTransactions();
    }, [currencyList]);

    const getCurrencies = useCallback(async (curr_id = null) => {

        const {data, error} = await supabase
            .from("Currencies")
            .select()
            .eq('user_id', authUser.id)
            .order('currency_id', {ascending: true});

        if (error) {
            console.error('Error fetching currencies:', error);
        } else {
            setCurrencyList(data);

            if (data.length > 0) {
                if (curr_id !== null) {
                    const index = data.findIndex(item => item.currency_id === curr_id);
                    if (index !== -1) {
                        setSelectedCurrency(data[index]);
                    }
                    if (curr_id === "last") {
                        setSelectedCurrency(data[data.length - 1])
                    }
                } else {
                    console.log("selected currency null")
                }
            }
        }
    }, [authUser]);

    const getNumberOfCurrencies = async () =>{
        if(authUser){
            const { count, error } = await supabase
                .from('Currencies')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', authUser?.id);

            if (error) {
                console.error('Error fetching currencies:', error);
            } else {
                setNumberOfCurrencies(count)
            }
        }
    }

    const getNumberOfTransactions = async () =>{
        if(authUser) {

            const {count, error} = await supabase
                .from('Transactions')
                .select('*', {
                    count: 'exact',
                    head: true,
                })
                .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
                .in('currency_id',
                    (
                        await supabase
                            .from('Currencies')
                            .select('currency_id')
                            .eq('user_id', authUser?.id)
                    ).data?.map(c => c.currency_id)
                );

            if (error) {
                console.error('Error counting transactions:', error);
            } else {
                setNumberOfTransactions(count)
                console.log('Transaction count in past 7 days:', count);
            }
        }
    }

    const updateCurrency = async (transAmount = 0, transType=null) =>{
        let newAmount = amount;
        if(transType !== null){
            if(transType === "Income")
                newAmount += transAmount;
            else
                newAmount -= transAmount;
        }

        if(name !== selectedCurrency.currency_name || (newAmount) !== selectedCurrency.amount){
            const { data, error } = await supabase
                .from('Currencies')
                .update({
                    amount: newAmount,
                    currency_name: name,
                })
                .eq('currency_id', selectedCurrency.currency_id);

            if (error) {
                console.error('Update error:', error);
            } else {
                console.log('Updated successfully:', data);
                getCurrencies(selectedCurrency.currency_id);
            }
        }
    }

    return (
        <CurrencyContext.Provider
            value={{
                currencyList,
                setCurrencyList,
                selectedCurrency,
                setSelectedCurrency,
                getCurrencies,

                numberOfCurrencies,
                numberOfTransactions,

                name,
                setName,
                amount,
                setAmount,
                updateCurrency
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );


}