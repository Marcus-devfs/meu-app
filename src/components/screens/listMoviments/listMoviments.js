import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import api from "../../../config/api";
import { AuthContext } from "../../../context/validators/AuthContext";
import Colors from "../../atoms/Colors";
import { FontAwesome5 } from "../../atoms/icons";
import Moviments from "../../Moviments/moviments";
import { formatDate } from "../../../context/validadores";

export default function MovimentsList() {

    useEffect(() => {

    }, [])

    const { user } = useContext(AuthContext)
    const { name, _id } = user

    const idUser = _id

    useEffect(() => {
        movimentList();
    })

    const [listMoviment, useListItem] = useState();

    const movimentList = async () => {

        const response = await api.get(`/moviments`);
        const { msg } = response.data
        const list = msg.filter(list => list.createdBy === idUser)
        useListItem(list);

        return;
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.selectionMonth}>Selecione o mês: </Text>
                        <View style={{ padding: 5, width: 'auto', backgroundColor: Colors.lightGray, marginTop: 15, borderRadius: 5 }}>
                            <Text style={{ textAlign: 'center', fontSize: 17 }}>Abril</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.selectionMonth}>Selecione a Categoria: </Text>
                        <View style={{ padding: 5, width: 'auto', backgroundColor: Colors.lightGray, marginTop: 15, borderRadius: 5 }}>
                            <Text style={{ textAlign: 'center', fontSize: 17 }}>Saude</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.list}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {listMoviment == '' ? <Text style={{ fontSize: 15, textAlign: 'center', paddingTop: 40 }}> Sem Movimentações </Text> :
                        listMoviment?.map((item) => (
                            <TouchableOpacity key={item._id} style={styles.containerList}>
                                <Text style={styles.date}>{formatDate({ date: item.createdAt })}</Text>
                                <View style={styles.content}>
                                    <Text style={styles.label}>{item.label}</Text>
                                    <Text style={item.type == 'income' ? styles.value : styles.expenses}>
                                        {item.type == 'income' ? `R$ ${item.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}` : `R$ -${item.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            </View>
            {/* <TouchableOpacity style={{ bottom: 80, alignItems: 'flex-end', padding: 8, marginRight: 8 }} onPress={() => console.log(listMoviment)}>
                <FontAwesome5 name="wallet" size={35} color={Colors.darkGray}></FontAwesome5>
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerHeader: {
        backgroundColor: '#06373d',
        width: '100%',
        minHeight: 150,
        maxHeight: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectionMonth: {
        textAlign: 'center',
        top: 10,
        fontSize: 16,
        color: '#fff'
    },
    title: {
        textAlign: 'center',
        fontSize: 18
    },
    containerList: {
        marginTop: 20
    },
    list: {
        padding: 14,
        marginTop: 10,
        width: '100%',
        maxHeight: 350,
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
});