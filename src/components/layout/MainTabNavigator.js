import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '../atoms/icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/dashboard/dashboard';
import UserProfile from '../screens/users/userProfile';

export default function MainTabNavigator() {

    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      const icons = {
        Home: 'Dashboard',
        Profile: 'account',
      };

      return (
        <MaterialCommunityIcons
          name={icons[route.name]}
          color={color}
          size={size}
        />
      );
    },
  })}
>
  <Tab.Screen name="Dashboard" component={Dashboard} />
  <Tab.Screen name="Profile" component={UserProfile} />
</Tab.Navigator>

        // <Tab.Navigator 
        //     initialRouteName="Home"
        //     screenOptions={({ route }) => ({
        //         tabBarIcon: ({ focused, color, size }) => {
        //             let iconName;

        //             if (route.name === 'Dashboard') {
        //                 iconName = focused
        //                     ? 'ios-information-circle'
        //                     : 'ios-information-circle-outline';
        //             } else if (route.name === 'Profile') {
        //                 iconName = focused ? 'ios-list-box' : 'ios-list';
        //             }

        //             // You can return any component that you like here!
        //             return <Ionicons name={"apps"} size={24} color={"#1C1C1E"} />;
        //         },
        //         tabBarActiveTintColor: 'tomato',
        //         tabBarInactiveTintColor: 'gray',
        //     })}
        // >
        //     <Tab.Screen name="Dashboard" component={Dashboard} />
        //     <Tab.Screen name="Profile" component={UserProfile} />
        // </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 15,
    },
});