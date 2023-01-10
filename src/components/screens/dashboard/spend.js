import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import { AppContext } from '../../../context/validators/AppContext';
import { AuthContext } from '../../../context/validators/AuthContext';
import { createMovimentSpend } from '../../../interface/moviments-interface';
import Colors from '../../atoms/Colors';
import { FontAwesome5 } from '../../atoms/icons';
import { Spacer } from '../../atoms/Spacer';
import { TextInputState } from '../../atoms/TextIput';
import api from '../../../config/api';

export default function SpendControll() {

    const navigation = useNavigation()

    useEffect(() => {
        const handleLoadItems = async () => {
            startLoading({ msg: 'Carregando...' })
            await listCategory()
            stopLoading()
        }
        handleLoadItems()
    }, [listCategoryItem])

    const [load, setLoad] = useState(true)
    const { user } = useContext(AuthContext)
    const [listCategoryItem, useListCategory] = useState();
    const [categorySelected, useCategorySelected] = useState();
    const [showList, useShowList] = useState(false);
    const [showCreateCategory, useShowCreateCategory] = useState(false);
    const { startLoading, stopLoading } = useContext(AppContext)
    const { _id } = user
    const idUser = _id
    const [addCategoryList, useAddCategoryList] = useState({
        categoryName: '',
        user_id: idUser
    })
    const [spend, useSpend] = useState({
        label: '',
        value: '0.00',
        createdAt: '',
        type: 'expense',
        createdBy: idUser,
        user: idUser,
        category: categorySelected,
    })

    const handleChange = (name, value) => {
        if (name == 'createdAt') {
            if (value.length == 2 || value.length == 5) {
                value = value + '/';
            }
        }
        if (name == 'value') {
            value = value.replace(',', '.');
        }
        useSpend({
            ...spend,
            [name]: value
        })
    }
    const handleChangeCategoryName = (name, value) => {
        useAddCategoryList({
            ...addCategoryList,
            [name]: value
        })
    }
    const handleChangeValueSpend = async (text) => {
        if (text) {
            text = text.replace(',', '.');
        }
        useSpend({
            ...spend,
            value: text
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
        useSpend({ ...spend, category: categoryName })
    }

    const handleSend = async () => {

        try {
            const { createdAt, value, label } = spend

            if (!label || label == "") { return Alert.alert("MyBank", "Dados preenchidos de forma inválida.") }
            if (!createdAt || createdAt == "") { return Alert.alert("MyBank", "Data preenchida de forma inválida") }
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

    const handleCreateNewCategory = async () => {
        const { categoryName } = addCategoryList

        if (categoryName == '' || categoryName == null || categoryName == undefined) {
            Alert.alert('MyBank', 'Por favor, inserir um nome valido!')
        }

        await api.post('/categoryList/create', addCategoryList)
            .then(response => {
                const { dados } = response
                Alert.alert('MyBank', 'Nova categoria criada.')
                useAddCategoryList({ ...addCategoryList, categoryName: '' })
                useShowCreateCategory(!showCreateCategory)
            })
            .catch(error => {
                console.log(error.dados)
            })
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', bottom: 40 }}>
                <Text style={styles.title}>Adicionar Dispesas</Text>
                <View>
                    <FontAwesome5 name="hand-holding-usd" size={65} color={'#FFF'}></FontAwesome5>

                </View>
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.textForm}>Valor</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 35, color: '#FFF', top: 5, textAlign: 'center' }}>R$ </Text>
                    <TextInput
                        name="value"
                        value={spend.value}
                        type="number"
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        onChangeText={(text) => handleChangeValueSpend(text)}
                        style={{ width: 250, fontSize: 40, fontWeight: 'bold', color: '#fff', borderWidth: 1, borderColor: Colors.darkGray, textAlign: 'left', borderRadius: 3, marginLeft: 15 }}
                    />
                </View>
                <Spacer size={2} />
                <Text style={styles.textForm}>Descrição</Text>
                <TextInputState
                    placeholderTextColor={Colors.lightGray}
                    name="label"
                    value={spend.label}
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
                <Spacer size={0.5} />
                <Text style={styles.textForm}>Categoria:</Text>
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
                            <TouchableOpacity style={styles.addCategory} onPress={() => {
                                useShowCreateCategory(!showCreateCategory)
                            }}>
                                <View style={styles.areaButton}>
                                    <FontAwesome5 name="plus" size={15} color={Colors.darkGray}></FontAwesome5>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.addCategoryText}> Nova categoria</Text>
                        </View>
                        {showCreateCategory ?
                            <View style={{ marginTop: 10 }}>
                                <TextInputState
                                    placeholderTextColor="#696969"
                                    name="categoryName"
                                    value={addCategoryList.categoryName}
                                    autoCapitalize="none"
                                    handleChange={(name, value) => handleChangeCategoryName(name, value)}
                                />
                                <TouchableOpacity onPress={() => {
                                    handleCreateNewCategory()
                                }}
                                    style={{ backgroundColor: '#B22222', height: 30, width: 80, justifyContent: 'center', borderRadius: 5 }}>
                                    <Text style={{ fontSize: 16, textAlign: 'center', color: '#fff' }}>Criar</Text>
                                </TouchableOpacity>
                            </View>
                            : ''
                        }
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
        bottom: 20
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