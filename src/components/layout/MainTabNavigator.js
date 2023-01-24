import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../atoms/Colors';
import Dashboard from '../screens/dashboard/dashboard';
import UserProfile from '../screens/users/userProfile';
import { FontAwesome5, Ionicons } from '../atoms/icons';
import MovimentsList from '../screens/listMoviments/listMoviments';
import Graphics from '../screens/graphics/graphics';


export const TabNavigator = ({ navigation }) => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: Colors.lightGray,
                    height: 68,
                    paddingBottom: 15,
                    paddingTop: 5,
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarShowLabel: true,
                headerShown: false
            })}>
            <Tab.Screen name="Home" component={Dashboard}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name='home' size={30} color={focused ? Colors.primary : Colors.primary - 0.5} style={styles.tabConfig} />;
                    }
                }} />
            <Tab.Screen name="Relatório" component={MovimentsList}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return (<FontAwesome5 name='exchange-alt' size={30} color={focused ? Colors.primary : Colors.primary - 0.5} style={styles.tabConfig} />);
                    }
                }} />
            {/* <Tab.Screen name="Gráficos" component={Graphics}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return (<FontAwesome5 name='chart-bar' size={30} color={focused ? Colors.primary : Colors.primary - 0.5} style={styles.tabConfig} />);

                    }
                }} /> */}
            <Tab.Screen name="Perfil" component={UserProfile}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name='cog' size={30} color={focused ? Colors.primary : Colors.primary} style={styles.tabConfig} />;
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