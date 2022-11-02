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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { doLoginByToken } from '../../interface/auth-interface';



const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {

    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {

        const signinToken = async (navigation) => {
            const token = await AsyncStorage.getItem('@MyBank', token)
            if (token)
                try {
                    const user = await doLoginByToken(token)
                    setUser(user)
                    console.log(user, 'tela Login')
                } catch (error) {
                    console.error(error.data);
                }
            else {
                navigation.navigate('Signin')
            }
        };
        signinToken();
    }, [])

    //Se não estiver autorizado, usar telas de Login e Cadastro

    return (
        <Stack.Navigator>
            {user && isLoggedInStack}
            {!user && <>
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
    </>









