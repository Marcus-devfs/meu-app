import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, HeaderBackground } from 'react-navigation-stack';
import Dashboard from '../screens/dashboard/dashboard';
import { Signin } from '../screens/auth/Signin';
import { SignUp } from '../screens/auth/SignUp';
import UserProfile from '../screens/users/userProfile';
import Colors from '../atoms/Colors';


//se estiver autorizado, usar as telas abaixo

const Stack = createNativeStackNavigator();

export default function Stacks() {
    
    return (
        <Stack.Navigator >
            {/* <Stack.Screen
                name="Signin"
                component={Signin} 
                options={{headerShown: false,}}
                /> */}
            <Stack.Screen
                name="dashboard"
                component={Dashboard}
                options={{headerShown: false,}}
               />
           
           <Stack.Screen
                name="userProfile"
                component={UserProfile}
                options={{headerShown: false,}}
                />
                
           
            <Stack.Screen
                name="SignUp"
                component={SignUp} />
           
        </Stack.Navigator>
    );

}





