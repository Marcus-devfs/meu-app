import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../atoms/Colors';
import Dashboard from '../screens/dashboard/dashboard';
import UserProfile from '../screens/users/userProfile';
import { Ionicons } from '../atoms/icons';
import { Signin } from '../screens/auth/Signin';
import Stacks from './Stacks';


export const StackHome = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" 
            component={Dashboard} 
            />
            <Stack.Screen name="Profile" 
            component={UserProfile} 
            />
        </Stack.Navigator>
    );

}




export const TabNavigator = ({ navigation }) => {


    const Tab = createBottomTabNavigator();


    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: Colors.primary, height: 60, paddingBottom: 5, paddingTop: 5
                },
                tabBarShowLabel: true,
                headerShown: false


            })}>


            <Tab.Screen name="Dashboard" component={Dashboard}
                options={{
                    
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name='home' size={22} color={focused ? '#FFF' : '#A9A9A9'} />;
                    }
                }} />
            <Tab.Screen name="userProfile" component={UserProfile}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name='cog' size={22} color={focused ? '#FFF' : '#A9A9A9'} />;
                    }
                }} />
        </Tab.Navigator>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 15,
        backgroundColor: Colors.lightGray
    },
});