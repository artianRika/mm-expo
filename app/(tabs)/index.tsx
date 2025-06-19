import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Appearance, StyleSheet} from 'react-native';
import {CurrencyScreen} from "@/components/ui/CurrencyScreen";
import {CustomDrawerContent} from "@/components/ui/CustomDrawer";


const Drawer = createDrawerNavigator();

export default function HomeScreen() {
    Appearance.getColorScheme = () => 'light';


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


});
