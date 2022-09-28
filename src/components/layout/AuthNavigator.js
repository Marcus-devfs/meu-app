import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from '../screens/dashboard/dashboard';
import { Signin } from '../screens/auth/Signin';
import { SignUp } from '../screens/auth/SignUp';
import UserProfile from '../screens/users/userProfile';
import Stacks from './Stacks';



const Stack = createNativeStackNavigator();

export default function AuthProvider() {
    const auth = true
    
    return (
        <>
                <Stack.Navigator>
                    <Stack.Screen
                        name="SignIn"
                        component={Signin}
                        options={{ headerShown: false }} />
                </Stack.Navigator>
        </>
    );

}
