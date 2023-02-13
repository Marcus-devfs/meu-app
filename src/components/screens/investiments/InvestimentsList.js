import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Colors from "../../atoms/Colors";

export default function Investiments({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.base}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Tela investimento</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 240,
        marginLeft: '5%',
        marginTop: 20,
    },
    base: {
        shadowColor: '#171717',
        backgroundColor: Colors.primary,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        height: 230,
    }
})