import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Stacks from './src/components/layout/Stacks';
import MainTabNavigator from './src/components/layout/MainTabNavigator';
import {AuthProvider} from './src/components/layout/AuthNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar/>
      <Stacks />
      {/* <MainTabNavigator /> */}
    </NavigationContainer>
  );
}
