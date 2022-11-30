import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../../context/validators/AuthContext';
import { createMovimentSpend } from '../../../interface/moviments-interface';
import Colors from '../../atoms/Colors';
import { Spacer } from '../../atoms/Spacer';
import { TextInputState } from '../../atoms/TextIput';

export default function SpendControll() {

    const navigation = useNavigation()

    useEffect(() => {

    }, [])



    const [load, setLoad] = useState(true)

    const { user } = useContext(AuthContext)
    const { _id } = user
    const idUser = _id

    const [spend, useSpend] = useState({
        label: '',
        value: '',
        createdAt: '',
        type: 0,
        createdBy: idUser,
        user: idUser,
    })

    const handleChange = (name, value) => {
        useSpend({
            ...spend,
            [name]: value
        })
    }
    const handleSend = async () => {

        try {
            const { createdAt, value, label } = spend

            if (!label || label == "") { return Alert.alert("MyBank", "Dados preenchidos de forma inválida.") }
            if (!createdAt || createdAt == "") {return Alert.alert("MyBank", "Data preenchida de forma inválida")}
            if (!value) {
                Alert.alert("MyBank", "Valor inválido")
                return
            }
            else {
                await createMovimentSpend(spend)
                navigation.goBack();
            }

        } catch (error) {
            console.log((error.data), 'Ocorreu um erro ao adicionar a movimentação')
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Despesas</Text>
            <View style={styles.containerForm}>
                <Text style={styles.textForm}>Descrição</Text>
                <TextInputState
                    placeholderTextColor={Colors.lightGray}
                    name="label"
                    value={spend.label}
                    autoCapitalize="none"
                    handleChange={(name, value) => handleChange(name, value)}
                />
                <Spacer size={0.5} />

                <Text style={styles.textForm}>Valor</Text>
                <TextInputState
                    placeholderTextColor="#696969"
                    name="value"
                    value={spend.value}
                    autoCapitalize="none"
                    handleChange={(name, value) => handleChange(name, value)}
                />
                <Spacer size={0.5} />
                <Text style={styles.textForm}>Data</Text>
                <TextInputState
                    placeholderTextColor="#696969"
                    name="createdAt"
                    value={spend.createdAt}
                    autoCapitalize="none"
                    handleChange={(name, value) => handleChange(name, value)}
                />
            </View>
            
            <View style={{flexDirection:'row-reverse', top: 30}}>
                <TouchableOpacity
                    style={styles.buttonLogin} onPress={handleSend}>
                    <Text style={{ color: '#fff', fontSize: 17 }}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonClean} onPress={() => useSpend('')}>
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
        bottom: 90

    },
    textForm: {
        color: '#fff',
        marginBottom: 5,
        marginLeft: 10,
        fontSize: 15
    },
    // containerForm: {
    //     flex: 1,

    // },
    buttonLogin: {
        backgroundColor: '#B22222',
        padding: 7,
        width: 120,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 8
    },
    buttonClean: {
        backgroundColor: Colors.secondary,
        padding: 7,
        width: 120,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginRight: 8
    }
});