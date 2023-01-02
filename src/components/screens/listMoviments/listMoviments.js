import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import api from "../../../config/api";
import { AuthContext } from "../../../context/validators/AuthContext";
import Colors from "../../atoms/Colors";
import { FontAwesome5 } from "../../atoms/icons";
import Moviments from "../../Moviments/moviments";
import { formatDate } from "../../../context/validadores";
import { AppContext } from "../../../context/validators/AppContext";
import { Spacer } from "../../atoms/Spacer";

export default function MovimentsList({ navigation }) {

    const { user } = useContext(AuthContext)
    const [listMoviment, useListItem] = useState();
    const [listCategoryItem, useListCategory] = useState();
    const [filterItem, useFilterItem] = useState('');
    const [showList, useShowList] = useState(true);
    const { startLoading, stopLoading } = useContext(AppContext)
    const { name, _id } = user
    const idUser = _id

    useEffect(() => {
        handleLoadItems()
    }, [navigation, filterItem])

    const handleLoadItems = async () => {
        startLoading({ msg: 'Carregando...' })
        await movimentList()
        listCategory()
        stopLoading()
    }

    const movimentList = async () => {
        const response = await api.get(`/moviment/${idUser}`);
        const { moviments } = response.data

        if (filterItem != '') {
            const filterItems = moviments.filter((item) => item.category == filterItem)
            startLoading({ msg: 'Carregando...' })
            useListItem(filterItems)
            stopLoading()
        }
        else {
            startLoading({ msg: 'Carregando...' })
            useListItem(moviments)
            stopLoading()
        }
        return;
    }

    const listCategory = async () => {
        const response = await api.get(`/categoryList/${idUser}`);
        const { categoryList } = response.data
        useListCategory(categoryList)
        return;
    }

    async function selectItem(categoryName) {
        if (categoryName == 'todos') {
            useFilterItem('');
        } else {
            useFilterItem(categoryName);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.selectionMonth}>Selecione o mês: </Text>
                        <View style={{ padding: 5, width: 'auto', backgroundColor: Colors.primary, marginTop: 15, borderRadius: 5, borderColor: Colors.lightGray, borderWidth: 0.5 }}>
                            <Text style={{ textAlign: 'center', fontSize: 17, color: Colors.lightGray }}>Abril</Text>
                        </View>
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
            <Spacer size={2} />
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <TouchableOpacity style={styles.addCategory} onPress={() => {
                    useFilterItem('')
                }}>
                    <FontAwesome5 name="filter" size={15} color={Colors.darkGray}></FontAwesome5>
                    <Text style={styles.addCategoryText}> Limpar</Text>
                </TouchableOpacity>
            </View>
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