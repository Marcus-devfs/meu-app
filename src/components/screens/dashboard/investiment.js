import React from "react";
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import { AuthContext } from '../../../context/validators/AuthContext';
import Colors from '../../atoms/Colors';
import { Spacer } from '../../atoms/Spacer';
import { TextInputState } from '../../atoms/TextIput';
import { FontAwesome5 } from '../../atoms/icons';
import { AppContext } from '../../../context/validators/AppContext';
import { createInvestiment } from "../../../interface/invetiments-interface";

export default function InvestimentControll() {

    const navigation = useNavigation()
    const { startLoading, stopLoading } = useContext(AppContext)
    const { user } = useContext(AuthContext)
    const { _id } = user
    const idUser = _id
    const [investiment, useInvestiment] = useState({
        value: '',
        date: '',
        type: '',
        user: idUser,
    })

    const handleChange = (name, value) => {
        if (name == 'date') {
            if (value.length == 2 || value.length == 5) {
                value = value + '/'
            }
        }
        if (name == 'value') {
            value = value.replace(',', '.');
        }
        useInvestiment({
            ...investiment,
            [name]: value
        })
    }

    const handleChangeValueInvestiment = async (text) => {
        if (text) {
            text = text.replace(',', '.');
        }
        useInvestiment({
            ...investiment,
            value: text
        })
    }

    const handleSend = async () => {

        try {
            const { date, value, type } = investiment

            if (!type || type == "") { return Alert.alert("MyBank", "Dados preenchidos de forma inválida.") }
            if (!date || date == "") { return Alert.alert("MyBank", "Data preenchida de forma inválida") }
            if (!value) {
                Alert.alert("MyBank", "Valor inválido")
                return
            }
            else {
                startLoading({ msg: 'Carregando...' })
                await createInvestiment(investiment)
                stopLoading()
                navigation.goBack();
            }

        } catch (error) {
            console.log((error.data), 'Ocorreu um erro ao adicionar a movimentação')
        }

    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', bottom: 40 }}>
                <Text style={styles.title}>Adicionar Investimentos</Text>
                <View>
                    <FontAwesome5 name="piggy-bank" size={65} color={'#FFF'}></FontAwesome5>
                </View>
            </View>
            <View>
                <Text style={styles.textForm}>Valor</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 35, color: '#FFF', top: 5, textAlign: 'center' }}>R$ </Text>
                    <TextInput
                        name="value"
                        placeholder="0.00"
                        value={investiment.value}
                        type="number"
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        onChangeText={(text) => handleChangeValueInvestiment(text)}
                        style={{ width: 250, fontSize: 40, fontWeight: 'bold', color: '#fff', borderWidth: 1, borderColor: Colors.primary, textAlign: 'left', borderRadius: 3, marginLeft: 15 }}
                    />
                </View>
                <Spacer size={2} />
                <Text style={styles.textForm}>Tipo de investimento</Text>
                <TextInputState
                    placeholderTextColor={Colors.lightGray}
                    placeholder="Ex: Fundo imobiliário"
                    name="type"
                    value={investiment.type}
                    autoCapitalize="none"
                    handleChange={(name, value) => handleChange(name, value)}
                />
                <Spacer size={0.5} />
                <Text style={styles.textForm}>Data</Text>
                <TextInputState
                    placeholderTextColor={Colors.lightGray}
                    placeholder="13/01/2023"
                    name="date"
                    value={investiment.date}
                    autoCapitalize="none"
                    handleChange={(name, value) => handleChange(name, value)}
                />
                <Spacer size={0.5} />
            </View>
            <View style={{ flexDirection: 'row-reverse', top: 30 }}>
                <TouchableOpacity
                    style={styles.buttonLogin} onPress={handleSend}>
                    <Text style={{ color: '#fff', fontSize: 17 }}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonClean} onPress={() => useInvestiment({ ...investiment, value: '0.00', type: '', date: '' })}>
                    <Text style={{ color: '#fff', fontSize: 17 }}>Limpar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 25,
        bottom: 20
    },
    textForm: {
        color: '#fff',
        marginBottom: 5,
        marginLeft: 10,
        fontSize: 15
    },
    buttonLogin: {
        backgroundColor: '#B22222',
        padding: 7,
        width: 120,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    buttonClean: {
        backgroundColor: Colors.secondary,
        padding: 7,
        width: 120,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginRight: 8
    },
    actionButton: {
        marginTop: 13,
        marginLeft: 20
    },
    areaButton: {
        backgroundColor: '#dadada',
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        height: 35,
        borderRadius: 100,
    },
    textCategory: {
        marginTop: 13,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        alignItems: 'center',
        color: '#fff'
    },
    listCategoryItem: {
        fontSize: 16,
        textAlign: 'center'
    },
    addCategory: {
        marginTop: 10,
    },
    addCategoryText: {
        color: '#fff',
        padding: 10,
        marginTop: 10,
    }
});