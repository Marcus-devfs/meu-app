import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function doLoginToken(props) {
    useEffect(() => {
        async function handleUserToken() {
            const userToken = await AsyncStorage.getItem('@Mybank', token);

            props.navigation.navigate(userToken ? 'dashboard' : 'Signin');
        }
        handleUserToken();
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator color={"#fff"} size={50} />
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

