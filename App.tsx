import 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { AllProductsScreen } from './src/infraestructure/screens';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/routes/StackNavigator';

export default function App(): React.JSX.Element {
  const queryClient = new QueryClient();

  return (
   
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <StackNavigator />
        </QueryClientProvider>
      </NavigationContainer>
  );
}




