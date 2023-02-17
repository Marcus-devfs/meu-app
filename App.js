import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Stacks from './src/components/layout/Stacks';
import Colors from './src/components/atoms/Colors';
import { AuthProvider } from './src/context/validators/AuthContext';
import { AuthNavigator } from './src/components/layout/AuthNavigator';
import { AppProvider } from './src/context/validators/AppContext';
import { Loading } from './src/components/atoms/Loading';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Alert } from './src/components/atoms/Alert';

export default function App() {
  return (

    <NavigationContainer>
      <StatusBar />
      <AppProvider>
        <AuthProvider>
          <AuthNavigator />
          <Loading />
          <Alert />
        </AuthProvider>
      </AppProvider>
    </NavigationContainer>
  );
}
