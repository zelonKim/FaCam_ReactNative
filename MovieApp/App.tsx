import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, type PropsWithChildren } from 'react';
import { RootStackParamList } from './src/types';
import MoviesScreen from './src/screens/MoviesScreen/MoviesScreen';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import MovieScreen from './src/screens/MovieScreen/MovieScreen';
import RemindersScreen from './src/screens/RemindersScreen/RemindersScreen';
import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import PurchaseScreen from './src/screens/PurchaseScreen/PurchaseScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

const REVENUECAT_API_KEY =
  Platform.OS === 'ios'
    ? 'fjwhrowejhnrjkna234hj543kl'
    : 'sfhuier39jkklntjkrl36';

function App() {
  useEffect(() => {
    (async () => {
      await Purchases.setDebugLogsEnabled(__DEV__);
      await Purchases.configure({ apiKey: REVENUECAT_API_KEY });
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Movies" component={MoviesScreen} />
          <Stack.Screen name="Movie" component={MovieScreen} />
          <Stack.Screen name="Reminders" component={RemindersScreen} />
          <Stack.Screen name="Purchase" component={PurchaseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
