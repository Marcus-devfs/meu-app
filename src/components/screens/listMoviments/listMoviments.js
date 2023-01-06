import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from "react-native";
import api from "../../../config/api";
import { AuthContext } from "../../../context/validators/AuthContext";
import Colors from "../../atoms/Colors";
import { FontAwesome5 } from "../../atoms/icons";
import Moviments from "../../Moviments/moviments";
import { formatDate } from "../../../context/validadores";
import { AppContext } from "../../../context/validators/AppContext";
import { Spacer } from "../../atoms/Spacer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInputState } from "../../atoms/TextIput";

export default function MovimentsList({ navigation }) {

    const { user } = useContext(AuthContext)
    const [listMoviment, useListItem] = useState();
    const [listCategoryItem, useListCategory] = useState();
    const [filterItem, useFilterItem] = useState('');
    const [showList, useShowList] = useState(true);
    const [showDate, useShowDate] = useState(true);
    const { startLoading, stopLoading } = useContext(AppContext)
    const { name, _id } = user
    const idUser = _id
    const [data_filter, useStatusFilterDate] = useState({
        date_start: '',
        date_finished: '',
        categorySelected: filterItem != '' ? filterItem : '',
        user_find: idUser
    });


    useEffect(() => {
        handleLoadItems()
    }, [navigation, data_filter])

    const handleLoadItems = async () => {
        startLoading({ msg: 'Carregando...' })
        // await movimentList()
        listCategory()
        stopLoading()
    }

    // const movimentList = async () => {

    //     const response = await api.get(`/moviment/${idUser}`);
    //     const { moviments } = response.data

    //     if (filterItem != '') {
    //         const filterItems = moviments.filter((item) => item.category == filterItem)
    //         startLoading({ msg: 'Carregando...' })
    //         useListItem(filterItems)
    //         useStatusFilterDate({ ...data_filter, categorySelected: filterItem })
    //         stopLoading()
    //     }
    //     else {
    //         startLoading({ msg: 'Carregando...' })
    //         useListItem(moviments)
    //         stopLoading()
    //     }
    //     return;
    // }

    const listCategory = async () => {
        const response = await api.get(`/categoryList/${idUser}`);
        const { categoryList } = response.data
        useListCategory(categoryList)
        return;
    }
    
    //ok
    async function selectItem(categoryName) {
        if (categoryName == 'todos') {
            useFilterItem('');
            useStatusFilterDate({...data_filter, categorySelected: filterItem})
        } else {
            useFilterItem(categoryName);
            useStatusFilterDate({...data_filter, categorySelected: filterItem})
        }
    }

    const filterData = async () => {
       
        try {
            startLoading({ msg: 'Carregando...' })
            const response = await api.get('/movimentsList', data_filter)
            const { movimentsFilterDate } = response.data
            useListItem(movimentsFilterDate)
            stopLoading()
            return
        } catch (error) {
            stopLoading()
            console.log(error)
        }
    }

    const handleChange = (name, value) => {
        if (name == 'date_start') {
            if (value.length == 2 || value.length == 5) {
                value = value + '/'
            }
        }
        if (name == 'value') {
            value = value.replace(',', '.');
        }
        useStatusFilterDate({
            ...data_filter,
            [name]: value
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={!showDate ? { paddingTop: 10.5 } : { paddingTop: 19 }}>
                        <Text style={styles.selectionMonth}>Selecione a data: </Text>
                        {showDate ?
                            <TouchableOpacity style={{
                                padding: 5, width: 'auto',
                                backgroundColor: Colors.primary,
                                marginTop: 15,
                                borderRadius: 5,
                                borderColor: Colors.lightGray,
                                borderWidth: 0.5,
                                marginBottom: 20
                            }}
                                onPress={(e) => {
                                    useShowDate(!showDate)
                                }}>
                                <Text style={{ textAlign: 'center', fontSize: 17, color: Colors.lightGray }}>Abril</Text>
                            </TouchableOpacity>
                            :
                            <View style={{ backgroundColor: '#fff', width: 155, height: 60, top: 12, alignItems: 'center', borderRadius: 5 }}>
                                <TextInput
                                    placeholder="de:"
                                    name="date_start"
                                    value={data_filter.date_start}
                                    underlineColorAndroid={'rgba(0,0,0,0)'}
                                    onChangeText={(name, value) => handleChange(name, value)}
                                    style={{ width: 150, borderBottomWidth: 1, borderBottomColor: Colors.darkGray, textAlign: 'center', height: 15, marginTop: 10 }}
                                />
                                <TextInput
                                    placeholder="até:"
                                    name="date_finished"
                                    value={data_filter.date_finished}
                                    underlineColorAndroid={'rgba(0,0,0,0)'}
                                    onChangeText={(name, value) => handleChange(name, value)}
                                    style={{ width: 150, borderBottomWidth: 1, borderBottomColor: Colors.darkGray, marginTop: 10, height: 15, textAlign: 'center' }}
                                />
                            </View>

                        }

                    </View>

                    <View style={!showList ? { paddingTop: 50.5 } : { paddingTop: 0 }}>
                        <Text style={styles.selectionMonth}>Selecione a Categoria: </Text>
                        {showList ?
                            <TouchableOpacity
                                style={{
                                    padding: 5,
                                    width: 'auto',
                                    backgroundColor: Colors.primary,
                                    marginTop: 15,
                                    borderRadius: 5,
                                    borderColor: Colors.lightGray,
                                    borderWidth: 0.5
                                }}
                                onPress={() => useShowList(!showList)}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 17, color: Colors.lightGray
                                }}>{filterItem == '' ? 'Todos' : filterItem}</Text>
                            </TouchableOpacity>
                            :
                            <ScrollView style={{ marginTop: 15 }}>
                                {listCategoryItem?.map((item) => (
                                    <View key={item?._id} style={{ width: 'auto', backgroundColor: '#fff', borderColor: Colors.lightGray, borderBottomWidth: 1 }}>
                                        <TouchableOpacity onPress={() => {
                                            selectItem(item.categoryName)
                                            useShowList(!showList)
                                        }}>
                                            <Text style={styles.listCategoryItem}>{item?.categoryName}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                        }
                    </View>
                </View>
            </View>
            <Spacer size={0.5} />
            <View style={{ padding: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                    filterData()
                }}
                    style={{
                        backgroundColor: Colors.lightGray,
                        width: 60,
                        height: 22,
                        borderRadius: 5,
                        marginRight: 10
                    }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center', justifyContent: 'center' }}>Filtrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addCategory} onPress={() => {
                    useFilterItem('')
                    useStatusFilterDate({
                        date_start: '',
                        date_finished: '',
                        categorySelected: '',
                        user_find: idUser
                    })
                }}>
                    <FontAwesome5 name="filter" size={15} color={Colors.darkGray}></FontAwesome5>
                    <Text style={styles.addCategoryText}> Limpar</Text>
                </TouchableOpacity>
            </View>
            <Spacer size={1} />
            <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold' }}>Relatório de Transações</Text>
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
        </View >
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
        color: '#fff',
    },
    selectionDate: {
        textAlign: 'center',
        paddingBottom: 0,
        fontSize: 16,
        color: '#fff',
    },
    title: {
        textAlign: 'center',
        fontSize: 18
    },
    containerList: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderColor: Colors.lightGray
    },
    list: {
        padding: 14,
        marginTop: 10,
        width: '100%',
        maxHeight: 440,
        minHeight: 440,
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
    listCategoryItem: {
        fontSize: 16,
        textAlign: 'center'
    },
    addCategory: {
        flexDirection: 'row'
    }
});