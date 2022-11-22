import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import api from "../../../config/api";
import Colors from "../../atoms/Colors";

export function DoLoginToken(props) {
    const navigation = useNavigation()

    useEffect(() => {
        const signinToken = async () => {

            const userToken = await AsyncStorage.getItem('@MyBank', token)
            console.log(token, 'signinTOken')

            if (userToken)
                try {
                    const data = await api.get("/", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    navigation.navigate('dashboard')
                    console.log(data.data, 'data SigninToken');
                } catch (error) {
                    console.error(error.data);
                    navigation.navigate('Signin')
                }
            else {
                navigation.navigate('Signin')
            }
        };
        signinToken();
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

const LoadingIndicator =
    <View>
        <ActivityIndicator color={"#fff"} size={50} />
    </View>

