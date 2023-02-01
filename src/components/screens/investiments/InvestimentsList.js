import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import api from "../../../config/api";
import { AuthContext } from "../../../context/validators/AuthContext";
import Colors from "../../atoms/Colors";
import { AppContext } from "../../../context/validators/AppContext";
import { Spacer } from "../../atoms/Spacer";
import { FontAwesome5 } from "../../atoms/icons";
import { VictoryPie } from "victory-native";
import { formatDate } from "../../../context/validadores";

export default function Investiments({ navigation }) {

    const { user } = useContext(AuthContext)
    const { startLoading, stopLoading } = useContext(AppContext)
    const { name, _id } = user
    const idUser = _id


    useEffect(() => {
        navigation.addListener('focus', () =>
            console.log(user)
        )
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text>Investimentos</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})