import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../atoms/Colors';
import Dashboard from '../screens/dashboard/dashboard';
import UserProfile from '../screens/users/userProfile';
import { Ionicons } from '../atoms/icons';
import { Signin } from '../screens/auth/Signin';
import LoggedInStacks from './Stacks';


export const TabNavigator = ({ navigation }) => {


    const Tab = createBottomTabNavigator();


    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: Colors.primary, height: 68, paddingBottom: 15, paddingTop: 5,
                },
                tabBarShowLabel: true,
                headerShown: false


            })}>


            <Tab.Screen name="Home" component={Dashboard}
                options={{

                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name='home' size={30} color={focused ? '#fff' : '#A9A9A9'} style={styles.tabConfig} />;
                    }
                }} />
            <Tab.Screen name="Profile" component={UserProfile}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name='cog' size={30} color={focused ? '#fff' : '#A9A9A9'} style={styles.tabConfig} />;
                    }
                }} />
        </Tab.Navigator>
    );
}



const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     paddingHorizontal: 15,
    //     paddingTop: 15,
    //     backgroundColor: Colors.lightGray
    // },
    tabConfig: {
    }
});