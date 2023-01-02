import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../../context/validators/AuthContext';
import { createMovimentDeposit } from '../../../interface/moviments-interface';
import Colors from '../../atoms/Colors';
import { Spacer } from '../../atoms/Spacer';
import { TextInputState } from '../../atoms/TextIput';
import { FontAwesome5 } from '../../atoms/icons';
import { AppContext } from '../../../context/validators/AppContext';
import api from '../../../config/api';

export default function DepositControll() {

    const navigation = useNavigation()

    useEffect(() => {
        const handleLoadItems = async () => {
            startLoading({ msg: 'Carregando...' })
            await listCategory()
            stopLoading()
        }
        handleLoadItems()
    }, [])



    const [load, setLoad] = useState(true)
    const [listCategoryItem, useListCategory] = useState();
    const [categorySelected, useCategorySelected] = useState();
    const [showList, useShowList] = useState(false);
    const { startLoading, stopLoading } = useContext(AppContext)
    const { user } = useContext(AuthContext)
    const { _id } = user
    const idUser = _id

    const [deposit, useDeposit] = useState({
        label: '',
        value: '',
        createdAt: '',
        type: 'income',
        createdBy: idUser,
        user: idUser,
        category: categorySelected,
    })

    const handleChange = (name, value) => {
        if (name == 'createdAt') {
            if (value.length == 2 || value.length == 5) {
                value = value + '/'
            }
        }
        if (name == 'value') {
            value = value.replace(',', '.');
        }
        useDeposit({
            ...deposit,
            [name]: value
        })
    }

    const listCategory = async () => {
        const response = await api.get(`/categoryList/${idUser}`);
        const { categoryList } = response.data
        useListCategory(categoryList)
        return;
    }

    async function selectItem(categoryName) {
        useCategorySelected(categoryName)
        useDeposit({ ...deposit, category: categoryName })
        console.log(deposit)

    }

    const handleSend = async () => {

        try {
            const { createdAt, value, label, category } = deposit

            if (!label || label == "") { return Alert.alert("MyBank", "Dados preenchidos de forma inválida.") }
            if (!createdAt || createdAt == "") { return Alert.alert("MyBank", "Data preenchida de forma inválida") }
            if (!category || category == "") { return Alert.alert("MyBank", "Dados preenchidos de forma inválida.") }
            if (!value) {
                Alert.alert("MyBank", "Valor inválido")
                return
            }
            else {
                await createMovimentDeposit(deposit)
                console.log(deposit)
                navigation.goBack();
            }

        } catch (error) {
            console.log((error.data), 'Ocorreu um erro ao adicionar a movimentação')
        }

    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Receitas</Text>
            <View>
                <Text style={styles.textForm}>Descrição</Text>
                <TextInputState
                    placeholderTextColor={Colors.lightGray}
                    name="label"
                    value={deposit.label}
                    autoCapitalize="none"
                    handleChange={(name, value) => handleChange(name, value)}
                />
                <Spacer size={0.5} />
                <Text style={styles.textForm}>Valor</Text>
                <TextInputState
                    placeholderTextColor="#696969"
                    name="value"
                    value={deposit.value}
                    autoCapitalize="none"
                    handleChange={(name, value) => handleChange(name, value)}
                />
                <Spacer size={0.5} />
                <Text style={styles.textForm}>Data</Text>
                <TextInputState
                    placeholderTextColor="#696969"
                    name="createdAt"
                    value={deposit.createdAt}
                    autoCapitalize="none"
                    handleChange={(name, value) => handleChange(name, value)}
                />
                <Spacer size={0.5} />
                <Text style={styles.textForm}>Category</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => useShowList(!showList)}>
                        <View style={styles.areaButton}>
                            <FontAwesome5 name="wallet" size={15} color={Colors.darkGray}></FontAwesome5>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.textCategory}> {!!categorySelected ? categorySelected : 'selecionar'} </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                </View>
                {showList ?
                    <ScrollView style={{ marginTop: 15 }}>
                        {listCategoryItem?.map((item) => (
                            <View key={item?._id} style={{ width: '100%', backgroundColor: '#fff', borderColor: Colors.lightGray, borderBottomWidth: 1, borderRadius: 5, padding: 8, marginBottom: 5 }}>
                                <TouchableOpacity onPress={() => {
                                    selectItem(item.categoryName)
                                    useShowList(!showList)
                                }}>
                                    <Text style={styles.listCategoryItem}>{item?.categoryName}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.addCategory} onPress={() => console.log(deposit)}>
                                <View style={styles.areaButton}>
                                    <FontAwesome5 name="plus" size={15} color={Colors.darkGray}></FontAwesome5>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.addCategoryText}> Nova categoria</Text>
                        </View>
                    </ScrollView>
                    : ''
                }
            </View>
            <View style={{ flexDirection: 'row-reverse', top: 30 }}>
                <TouchableOpacity
                    style={styles.buttonLogin} onPress={handleSend}>
                    <Text style={{ color: '#fff', fontSize: 17 }}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonClean} onPress={() => useDeposit('')}>
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