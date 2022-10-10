import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/dashboard/dashboard';
import UserProfile from '../screens/users/userProfile';
import MainTabNavigator from './MainTabNavigator';


const Stack = createNativeStackNavigator();

const Stacks =
    <>
        <Stack.Screen
            name="MainTabNavigator"
            component={MainTabNavigator}
            options={{ headerShown: false }} />
        <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={headerOptions} />
    <Stack.Screen
            name="userProfile"
            component={UserProfile}
            options={headerOptions} />
    </>


const headerOptions = {
    headerShown: false
}

export default Stacks