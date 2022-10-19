import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../atoms/Colors';

export default function Moviments({ data }) {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.content}>{data.date}</Text>

            <View style={styles.content}>
                <Text style={styles.label}>{data.label}</Text>
                <Text style={styles.value}>{data.value}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        marginBottom: 13,
        backgroundColor:Colors.lightGray,
        padding: 5,
       
    },
    content: {
        flex: 1,
        color: '#fff',
        padding: 5,
        alignItems: 'flex-end'
    },
    label:{

    },
    value: {

    }
});