import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from '../screens/dashboard/dashboard';
import { Signin } from '../screens/auth/Signin';
import { SignUp } from '../screens/auth/SignUp';
import UserProfile from '../screens/users/userProfile';



const Stack = createNativeStackNavigator();

export default function Stacks() {
    
    return (
        <Stack.Navigator 
        screenOptions={{
            headerShown: false
          }}>
            
            <Stack.Screen
                name="Signin"
                component={Signin} 
                />
            <Stack.Screen
                name="dashboard"
                component={Dashboard}/>
           
           <Stack.Screen
                name="userProfile"
                component={UserProfile}/>
           
            <Stack.Screen
                name="SignUp"
                component={SignUp} />
           
        </Stack.Navigator>
    );

}





