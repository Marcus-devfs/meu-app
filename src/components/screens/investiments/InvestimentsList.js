import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import api from "../../../config/api";
import { formatDate } from "../../../context/validadores";
import { AppContext } from "../../../context/validators/AppContext";
import { AuthContext } from "../../../context/validators/AuthContext";
import Colors from "../../atoms/Colors";
import { FontAwesome5, Ionicons } from "../../atoms/icons";
import { Spacer } from "../../atoms/Spacer";

export default function Investiments({ navigation }) {




    const [investiments, setInvestiments] = useState()
    const { user } = useContext(AuthContext)
    const { _id } = user
    const { startLoading, stopLoading, loading } = useContext(AppContext)
    const [showButton, setShowButton] = useState(false)
    const [ShowAddInvestiment, setShowAddInvestiment] = useState(false)

    useEffect(() => {
        navigation.addListener('focus', () =>
            handleLoadList(),
            listInvestiment()
        )
    }, [investiments])

    const listInvestiment = async () => {
        await api.get(`/investmentList/${user._id}`)
            .then(response => {
                const { investment } = response.data
                startLoading({ msg: 'Carregando...' })
                setInvestiments(investment)
                stopLoading()
            })
            .catch(error => {
                console.log('error investiment', error)
            })
    }

    const handleLoadList = async () => {
        startLoading({ msg: 'Carregando...' })

        stopLoading()
    }

    async function deleteMoviment(_id) {
        await api.delete(`/investmentList/delete/${_id}`);
        const newList = investiments.filter((item) => item._id !== _id);
        setInvestiments(newList);
        setShowButton(!showButton)
        Alert.alert('MyBank', 'Investimento deletado!')
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 60, backgroundColor: '#fff', flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 60, height: 5, backgroundColor: Colors.lightGray, marginTop: 8, borderRadius: 10, }}></View>
                </View>

                <Spacer size={2} />

                <View style={styles.bodyDash}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.darkGray, marginLeft: 40, marginTop: 15, paddingBottom: 15 }}>Extrato investimentos</Text>
                        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => setShowButton(!showButton)}>
                            <Ionicons name="trash" size={25} color={Colors.darkGray}></Ionicons>
                        </TouchableOpacity>
                        {showButton ? (
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => setShowButton(!showButton)}>
                                <Ionicons name="close" size={25} color={Colors.darkGray}></Ionicons>
                            </TouchableOpacity>) : ''}
                    </View>
                    <View style={{ marginTop: 10, paddingHorizontal: 2, }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {investiments == '' ? <Text style={{ fontSize: 15, textAlign: 'center', paddingTop: 40 }}> Sem Investiments </Text> :
                                investiments?.map((data) => (
                                    <TouchableOpacity key={data._id} style={styles.containerList}>
                                        <Text style={styles.date}>{formatDate({ date: data.date })}</Text>
                                        <View style={styles.content}>
                                            <Text style={styles.label}>{data.type}</Text>
                                            <Text style={styles.value}>
                                                {`R$ ${data.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
                                            </Text>
                                            {showButton ? (
                                                <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteMoviment(data._id)}>
                                                    <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center' }}>Apagar</Text>
                                                </TouchableOpacity>
                                            ) : ""}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                        </ScrollView>
                    </View>
                </View>

                {ShowAddInvestiment ?
                    <View style={{ alignItems: 'flex-end' }}>
                        <View style={{ bottom: 15 }}>
                            <TouchableOpacity style={{ backgroundColor: Colors.primary, paddingHorizontal: 10, top: 15, marginRight: 5, borderRadius: 5, paddingVertical: 4 }}
                                onPress={() => navigation.navigate('investimentControll')}>
                                <Text style={{ color: '#fff' }}> Investir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : ''}

                <View style={ShowAddInvestiment ? { alignItems: 'flex-end', marginRight: 20, top: 15 } : { alignItems: 'flex-end', marginRight: 20, top: 38 }}>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: Colors.primary,
                        borderWidth: 1,
                        width: 45,
                        height: 45,
                        borderRadius: 30
                    }} onPress={() => {
                        setShowAddInvestiment(!ShowAddInvestiment)
                    }}>
                        <FontAwesome5 name="piggy-bank" size={25}></FontAwesome5>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    bodyDash: {
        width: '100%',
        height: '80%'
    },
    containerList: {
        padding: 5,
        paddingHorizontal: 15,
        flex: 1,
        marginTop: 3,
        backgroundColor: '#fff',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
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
    buttonDelete: {
        backgroundColor: 'red',
        paddingHorizontal: 6,
        paddingVertical: 4,
        textAlign: 'center',
        borderRadius: 5
    },

})