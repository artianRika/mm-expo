import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';

import { CurrencyProvider } from '@/contexts/currencyContext';
import { TransactionsProvider } from '@/contexts/transactionContext';
import { UserProvider, UserContext } from '@/contexts/UserContext';
import { PaperProvider } from 'react-native-paper';

import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

function AuthRedirectWrapper({ children }) {
  const { isLoggedIn, loading } = useContext(UserContext);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!loading) {
      const inAuthGroup = segments[0] === 'auth';

      if (!isLoggedIn() && !inAuthGroup) {
        router.replace('/auth/login');
      } else if (isLoggedIn() && inAuthGroup) {
        router.replace('/(tabs)');
      }
    }
  }, [loading, isLoggedIn, segments]);

  if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
    );
  }

  return children;
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
      <ThemeProvider value={DefaultTheme}>
        <UserProvider>
          <AuthRedirectWrapper>
            <PaperProvider>
              <CurrencyProvider>
                <TransactionsProvider>
                  <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="auth/login" options={{ headerShown: false }} />
                    <Stack.Screen name="auth/register" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                  <StatusBar style="auto" />
                </TransactionsProvider>
              </CurrencyProvider>
            </PaperProvider>
          </AuthRedirectWrapper>
        </UserProvider>
      </ThemeProvider>
  );
}
