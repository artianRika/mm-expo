import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CurrencyButton from "@/components/ui/CurrencyButton";


function CurrencyScreen({ route }) {
  const { currency } = route.params || { currency: { name: 'Select currency', symbol: '' } };
  return (
      <View style={styles.screen}>
        <Text style={styles.title}>{currency.name}</Text>
        <Text style={styles.symbol}>{currency.symbol}</Text>
      </View>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const currencies = [
    { id: '1', name: 'Euro', symbol: '€' },
    { id: '2', name: 'Dollar', symbol: '$' },
    { id: '3', name: 'Bitcoin', symbol: '₿' },
  ];

  return (
      <DrawerContentScrollView {...props}>
        <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>Currencies</Text>
        </View>

        {currencies.map((cur) => (
            <CurrencyButton
                currency="EUR"
                currencyName="Euro"
                onPress={() => console.log('Euro clicked')}
            />
        ))}

        <DrawerItem
            label="Add Currency"
            onPress={() => alert('Add Currency pressed')}
            labelStyle={{ color: '#8effae', fontWeight: 'bold' }}
        />


      </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function HomeScreen() {
  return (
      <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: true,
            drawerType: 'slide',
            drawerStyle: { width: 280 },
            overlayColor: 'rgba(0,0,0,0.3)',
          }}
      >
        <Drawer.Screen
            name="Currency"
            component={CurrencyScreen}
            // initialParams={{ currency: { id: '0', name: 'Select a currency', symbol: '' } }}
            options={{ title: "${selected currency}" }}
        />
      </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold' },
  symbol: { fontSize: 22, marginTop: 10 },
});
