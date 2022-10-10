import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, HeaderBackground } from 'react-navigation-stack';
import Colors from '../atoms/Colors';
import Dashboard from '../screens/dashboard/dashboard';
import UserProfile from '../screens/users/userProfile';

export default function Stacks() {

    const logged = true

    return (
        <Stack.Navigator>
            {logged && <>
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={headerOptions} />
                <Stack.Screen
                    name="userProfile"
                    component={UserProfile}
                    options={headerOptions} />
            </>}
        </Stack.Navigator>
    )
}

const Stack = createNativeStackNavigator();

const headerOptions = {
    headerTintColor: Colors.primary,
    headerStyle: {
        backgroundColor: Colors.backgroundColor
    },
    headerBackTitle: '',
    headerTitle: () => <></>
}



