import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Colors from "../../atoms/Colors";

export function doLoginToken(props) {
    const [loading, setLoading] = useState(null);
    useEffect(() => {
        const signinToken = async () => {

            

            const userToken = await AsyncStorage.getItem('@MyBank', token)
            console.log(token, 'signinTOken')

            if (!!userToken)
                try {
                    setLoading(true)
                    setUser(user)
                    props.navigation.navigate('dashboard');
                    setLoading(false)
                } catch (error) {
                    console.error(error.data);
                    props.navigation.navigate('Signin')
                }
        };
        signinToken();



        // async function asynchandleUserToken () {
        //     const userToken = await AsyncStorage.getItem('@Mybank', token);

        //     props.navigation.navigate(userToken ? 'dashboard' : 'Signin');
        // }
        // handleUserToken();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? LoadingIndicator : props.navigation.navigate('dashboard')}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.primary,
        justifyContent: 'center'
    },
})

const LoadingIndicator =
    <View>
        <ActivityIndicator color={"#fff"} size={50} />
    </View>

