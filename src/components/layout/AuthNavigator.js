import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, HeaderBackground } from 'react-navigation-stack';
import Dashboard from '../screens/dashboard/dashboard';
import { Signin } from '../screens/auth/Signin';
import { SignUp } from '../screens/auth/SignUp';
import UserProfile from '../screens/users/userProfile';
import Colors from '../atoms/Colors';


//se não estiver autorizado, usar essas telas

const Stack = createNativeStackNavigator();

export const AuthStack = ()=> {
    
    return (
        <Stack.Navigator >
            <Stack.Screen
                name="Signin"
                component={Signin} 
                options={{headerShown: false,}}
                />           
        </Stack.Navigator>
    );

}





