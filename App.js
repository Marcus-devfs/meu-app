import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Stacks from './src/components/layout/Stacks';
import Colors from './src/components/atoms/Colors';
import { AuthProvider } from './src/context/validators/AuthContext';
import { AuthNavigator } from './src/components/layout/AuthNavigator';

export default function App() {
  return (
    
    <NavigationContainer>
      <AuthProvider>
        <StatusBar />
        {/* <Stacks /> */}
        {/* <AuthNavigator /> */}
      </AuthProvider>
    </NavigationContainer>
  );
}
