import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Stacks from './src/components/layout/Stacks';
import  MainTabNavigator  from './src/components/layout/MainTabNavigator';
import Colors from './src/components/atoms/Colors';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={Colors.primary}
        barStyle="light-content" />
      {/* <MainTabNavigator/> */}
      <Stacks/>
    </NavigationContainer>
  );
}
