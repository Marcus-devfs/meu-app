// import { useState, useContext, useEffect } from "react"
import { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "react-native";
import MainTabNavigator from "./MainTabNavigator";
import { AuthContext } from '../../context/validators/AuthContext';
import { doLoginByToken } from "../../interface/auth/auth-interface";
import Dashboard from "../screens/dashboard/dashboard";
import UserProfile from "../screens/users/userProfile";
import { Signin } from "../screens/auth/Signin";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {

    const { user, setUser } = useContext(AuthContext)

    useEffect(async () => {
        const token = await AsyncStorage.getItem('@Mybank', token)

        if (token) {
            const user = await doLoginByToken(token)
            setUser(user)
        }
    }, [])

    return (
        <Stack.Navigator>
            {user && LoggedInStackNavigator}
            {!user &&
                <Stack.Screen
                    name="SignIn"
                    component={Signin}
                    options={{ headerShown: false }} />
            }
        </Stack.Navigator>
    )
}

const LoggedInStackNavigator = <>
    <Stack.Screen
        name="MainTabNavigator"
        component={MainTabNavigator}
        options={{ headerShown: false }} />
    <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }} />
    <Stack.Screen
        name="userProfile"
        component={UserProfile}
        options={{ headerShown: false }} />
</>