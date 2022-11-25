import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import api from "../../../config/api";
import { AuthContext } from "../../../context/validators/AuthContext";
import Colors from "../../atoms/Colors";
import Moviments from "../../Moviments/moviments";

export default function MovimentsList() {

    useEffect(() => {

    }, [])

    const { user } = useContext(AuthContext)
    const { name, _id } = user

    const userName = name.split(" ")[0];
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
                <Text style={styles.selectionMonth}>Selecione o mês: ^</Text>
                <View style={{ padding: 15, width: '40%', backgroundColor: Colors.lightGray, alignItems: 'center', marginTop: 15 }}></View>
            </View>
            <View style={styles.containerList}>
                <Text style={styles.title}>Todas as Movimentações</Text>
                <FlatList
                    style={styles.list}
                    data={listMoviment}
                    keyExtractor={(item) => String(item._id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <Moviments data={item} />}
                />
            </View>
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
        marginTop: 10,
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
    },
});