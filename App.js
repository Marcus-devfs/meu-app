import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppContext, AppProvider } from './src/context/validators/AppContext';
import AuthNavigator from './src/components/layout/AuthNavigator';
import MainTabNavigator from './src/components/layout/MainTabNavigator';
import { AuthProvider } from './src/context/validators/AuthContext';
import { AuthContext } from './src/context/validators/AuthContext';
import Colors from './src/components/atoms/Colors';
import { SafeAreaView } from 'react-navigation';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={Colors.primary}
        barStyle="light-content" // Here is where you change the font-color
      />
      <AppProvider>
        <AuthProvider>
          <SafeAreaView>
            <AuthNavigator />
          </SafeAreaView>
        </AuthProvider>
      </AppProvider>
    </NavigationContainer >
  );
}
