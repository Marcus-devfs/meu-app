import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";

export default function Investiments({ navigation }) {

    return (
        <View style={styles.container}>
            <Text>Tela investimento</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        width: '100%',
        height: 240
    },
})