import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, HeaderBackground } from 'react-navigation-stack';
import Dashboard from '../screens/dashboard/dashboard';
import { Signin } from '../screens/auth/Signin';
import { SignUp } from '../screens/auth/SignUp';
import UserProfile from '../screens/users/userProfile';
import Colors from '../atoms/Colors';
import { RegisterScreen } from '../screens/auth/Register';
import { TabNavigator } from './MainTabNavigator';
import { useState } from 'react';



const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
    const isLoggedIn = true

console.log('AuthNvigator',isLoggedIn)

    //Se não estiver autorizado, usar telas de Login e Cadastro
    if (!isLoggedIn) {
        return (
            <Stack.Navigator >
                <Stack.Screen
                    name="Signin"
                    component={Signin}
                    options={{ headerShown: false, }}
                />
                <Stack.Screen
                    name="Register-Screen"
                    component={RegisterScreen}
                    options={{ headerShown: false, }}
                />
            </Stack.Navigator>
        );
    }

    //se estiver autorizado, usar as telas abaixo
    return (
        <Stack.Navigator >
             <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false, }}/>
            <Stack.Screen
                name="dashboard"
                component={Dashboard}
                options={{ headerShown: false, }}/>
            <Stack.Screen
                name="userProfile"
                component={UserProfile}
                options={{ headerShown: false, }}/>
        </Stack.Navigator>
    );

}









