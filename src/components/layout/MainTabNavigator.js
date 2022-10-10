import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../atoms/Colors';
import Dashboard from '../screens/dashboard/dashboard';
import UserProfile from '../screens/users/userProfile';
import { Ionicons } from '../atoms/icons';
import { Signin } from '../screens/auth/Signin';

export default function MainTabNavigator({ navigation }) {

    const Tab = createBottomTabNavigator();

    const user = false

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: Colors.primary, height: 80
                },
                tabBarShowLabel: false,
                headerShown: false

            })}>
               <Tab.Screen name="Signin" component={Signin}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name='home' size={30} color={focused ? '#FFF' : '#A9A9A9'} />;
                    }, 
                }} />
           
            <Tab.Screen name="Dashboard" component={Dashboard}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name='home' size={30} color={focused ? '#FFF' : '#A9A9A9'} />;
                    }
                }} />
            <Tab.Screen name="userProfile" component={UserProfile}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name='cog' size={30} color={focused ? '#FFF' : '#A9A9A9'} />;
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