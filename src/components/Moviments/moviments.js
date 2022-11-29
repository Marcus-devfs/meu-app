import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../../config/api';
import Colors from '../atoms/Colors';

export default function Moviments({ data }) {

    const [listMoviment, useListItem] = useState();

    const movimentList = async () => {

        const response = await api.get(`/moviments`);
        const { msg } = response.data
        // const { value } = msg
        const list = msg.filter(list => list.createdBy === idUser)
        useListItem(list);
        return;
    }

    async function deleteMoviment(id, eItem) {
        const response = await api.delete(`/moviments/${id}`)
        const { msg } = response.data
        console.log('aqui id', msg);
    }

    const [showButton, setShowButton] = useState(false);

    return (
        // <TouchableOpacity style={styles.container} >
        <TouchableOpacity style={styles.container} onPress={() => setShowButton(!showButton)}>

            <Text style={styles.date}>{data.createdAt}</Text>

            <View style={styles.content}>
                <Text style={styles.label}>{data.label}</Text>
                <Text style={data.type === 1 ? styles.value : styles.expenses}>
                    {data.type === 1 ? `R$ ${data.value}` : `R$ -${data.value}`}
                </Text>

                {showButton ? (
                    <TouchableOpacity style={styles.buttonDelete} onPress={(eItem) => deleteMoviment(data.id, eItem)}>
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