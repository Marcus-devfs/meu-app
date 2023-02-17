import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../../config/api';
import Colors from '../atoms/Colors';

export default function Moviments({ data }) {

    const deleteMoviment = async (_id) => {
        const response = await api.delete(`/moviments/${_id}`)
        const { msg } = response.data
    }

    const [showButton, setShowButton] = useState(false);

    return (
        <TouchableOpacity style={styles.container} onPress={() => setShowButton(!showButton)}>

            <Text style={styles.date}>{data.createdAt}</Text>

            <View style={styles.content}>
                <Text style={styles.label}>{data.label}</Text>
                <Text style={data.type == 'income' ? styles.value : styles.expenses}>
                    {data.type == 'income' ? `R$ ${data.value}` : `R$ -${data.value}`}
                </Text>

                {showButton ? (
                    <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteMoviment(data._id)}>
                        <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center' }}>Apagar</Text>
                    </TouchableOpacity>
                ) : ""}

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
    },
    buttonDelete: {
        backgroundColor: 'red',
        paddingHorizontal: 6,
        paddingVertical: 4,
        textAlign: 'center',
        borderRadius: 5
    }
});