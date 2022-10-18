import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Stacks from './src/components/layout/Stacks';
import MainTabNavigator, { Stack } from './src/components/layout/MainTabNavigator';
import Colors from './src/components/atoms/Colors';
import { AuthProvider } from './src/context/validators/AuthContext';
import AuthNavigator from './src/components/layout/AuthNavigator';
import AppContext from './src/context/validators/AppContext';

export default function App() {
  return (
    <NavigationContainer>

      <StatusBar />
      <Stacks />
    </NavigationContainer>
  );
}
