import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import 'react-native-gesture-handler';


import 'react-native-url-polyfill/auto';
import {CurrencyProvider} from "@/contexts/currencyContext";
import {PaperProvider} from "react-native-paper";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }



  return (
    <ThemeProvider value={DefaultTheme}>
      <PaperProvider>
        <CurrencyProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </CurrencyProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
