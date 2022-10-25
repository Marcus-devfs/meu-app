import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Colors from '../atoms/Colors';
import { Ionicons } from '../atoms/icons';
import { FontAwesome5 } from '../atoms/icons';

export default function Actions({ navigation }) {


    return (
        <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.areaButton}>
                    <FontAwesome5 name="wallet" size={30} color={Colors.darkGray}></FontAwesome5>
                </View>
                <Text style={styles.typeButton}> Entradas </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.areaButton}>
                    <FontAwesome5 name="cart-arrow-down" size={30} color={Colors.darkGray}></FontAwesome5>
                </View>
                <Text style={styles.typeButton}> Saídas </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.areaButton}>
                    <FontAwesome5 name="credit-card" size={30} color={Colors.darkGray}></FontAwesome5>
                </View>
                <Text style={styles.typeButton}> Cartões </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.areaButton}>
                    <FontAwesome5 name="barcode" size={30} color={Colors.darkGray}></FontAwesome5>

                </View>
                <Text style={styles.typeButton}> Contas </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.areaButton}>
                    <FontAwesome5 name="ellipsis-h" size={30} color={Colors.darkGray}></FontAwesome5>
                </View>
                <Text style={styles.typeButton}> Config </Text>
            </TouchableOpacity>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        marginTop: 60,
        paddingEnd: 13,
        paddingStart: 13,
        minHeight: 100,
        maxHeight: 100,

        // borderBottomWidth: 0.5,
        // borderBottomColor: Colors.lightGray,
        // borderTopWidth: 0.5,
        // borderTopColor: Colors.lightGray,
    },
    actionButton: {
        alignItems: 'center',
        marginRight: 30,
        marginTop: 5

    },
    areaButton: {
        backgroundColor: '#dadada',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 65,
        borderRadius: 100,

    },
    typeButton: {
        marginTop: 4,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',

    }

});