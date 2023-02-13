import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import api from "../../../config/api";
import { formatDate } from "../../../context/validadores";
import { AppContext } from "../../../context/validators/AppContext";
import { AuthContext } from "../../../context/validators/AuthContext";
import Colors from "../../atoms/Colors";

export default function Investiments({ navigation }) {

    


    const [investiments, setInvestiments] = useState()
    const { user } = useContext(AuthContext)
    const { _id } = user
    const { startLoading, stopLoading, loading } = useContext(AppContext)
    const [showButton, setShowButton] = useState(false)

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
            <View style={styles.base}>
                <Text style={{ color: Colors.primary, textAlign: 'center', fontWeight: 'bold' }}>Resumo dos investimentos</Text>
                {
                    <View style={{
                        marginTop: 10,
                        paddingHorizontal: 2,
                    }}>
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
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
        marginTop: 20,
    },
    base: {
        shadowColor: '#171717',
        backgroundColor: '#FFF',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        height: 230,
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

})