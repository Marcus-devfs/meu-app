import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../atoms/Colors';

export default function Moviments({ data }) {

    const [showValue, setShowValue] = useState(false);

    return (
        <TouchableOpacity style={styles.container} >
        {/* <TouchableOpacity style={styles.container} onPress={() => setShowValue(!showValue)}> */}

            <Text style={styles.date}>{data.createdAt}</Text>

            <View style={styles.content}>
                <Text style={styles.label}>{data.label}</Text>

                {/* {showValue ? ( */}
                <Text style={data.type === 1 ? styles.value : styles.expenses}
                >
                    {data.type === 1 ? `R$ ${data.value}` : `R$ -${data.value}`}
                </Text>
                    {/* <View style={styles.valueHidde}> */}
                    {/* </View> */}
                {/* )} */}

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.lightGray

    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 8
    },
    date: {
        color: Colors.lightGray,
        fontWeight: '600'
    },
    label: {
        fontWeight: '600',
        fontSize: 16

    },
    value: {
        fontWeight: '600',
        fontSize: 16,
        color: '#006400'
    },
    expenses: {
        fontWeight: '600',
        fontSize: 16,
        color: '#8B0000'
    },
    valueHidde: {
        marginTop: 8,
        width: 70,
        height: 10,
        opacity: 0.5,
        borderRadius: 5,
        backgroundColor: Colors.lightGray
    }
});