import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Appearance, StyleSheet} from 'react-native';
import {CurrencyScreen} from "@/components/ui/CurrencyScreen";
import {CustomDrawerContent} from "@/components/ui/CustomDrawer";
import AddCurrencyDialog from "@/components/dialogs/AddCurrencyDialog";


const Drawer = createDrawerNavigator();

export default function HomeScreen() {
    Appearance.getColorScheme = () => 'light';


    const [dialogVisible, setDialogVisible] = useState(false);

    const openDialog = () => setDialogVisible(true);
    const closeDialog = () => setDialogVisible(false);


    return (
        <>
      <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} openAddCurrencyDialog={openDialog} />}
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
      <AddCurrencyDialog
          addCurrencyAlertOpen={dialogVisible}
          onAddCurrencyAlertClose={closeDialog}
      />
    </>
  );
}

const styles = StyleSheet.create({


});
