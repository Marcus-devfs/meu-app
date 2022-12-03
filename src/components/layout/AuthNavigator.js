import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, HeaderBackground } from 'react-navigation-stack';
import Dashboard from '../screens/dashboard/dashboard';
import { Signin } from '../screens/auth/Signin';
import { SignUp } from '../screens/auth/SignUp';
import UserProfile from '../screens/users/userProfile';
import Colors from '../atoms/Colors';
import { RegisterScreen } from '../screens/auth/Register';
import { TabNavigator } from './MainTabNavigator';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/validators/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doLoginByToken } from '../../interface/auth-interface';
import { DoLoginToken } from '../screens/auth/LoginByToken';
import SpendControll from '../screens/dashboard/spend';
import DepositControll from '../screens/dashboard/deposit';



const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {

    const { user, setUser } = useContext(AuthContext)

    return (
        <Stack.Navigator>
            {user && isLoggedInStack}
            {!user && <>
                {/* <Stack.Screen
                    name="DoLoginByToken"
                    component={DoLoginToken}
                    options={{ headerShown: false, }} /> */}
                <Stack.Screen
                    name="Signin"
                    component={Signin}
                    options={{ headerShown: false, }} />

                <Stack.Screen
                    name="Register-Screen"
                    component={RegisterScreen}
                    options={{ headerShown: false, }} />
            </>
            }
        </Stack.Navigator>
    );

}

const isLoggedInStack =
    <>
        <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false, }} />
        <Stack.Screen
            name="dashboard"
            component={Dashboard}
            options={{ headerShown: false, }} />
        <Stack.Screen
            name="userProfile"
            component={UserProfile}
            options={{ headerShown: false, }} />
        <Stack.Screen
            name="spendControll"
            component={SpendControll}
            options={{ headerShown: false, }} />
        <Stack.Screen
            name="depositControll"
            component={DepositControll}
            options={{ headerShown: false, }} />
    </>









