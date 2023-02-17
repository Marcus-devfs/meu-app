import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import api from "../../../config/api";
import { AuthContext } from "../../../context/validators/AuthContext";
import Colors from "../../atoms/Colors";
import { AppContext } from "../../../context/validators/AppContext";
import { Spacer } from "../../atoms/Spacer";
import { FontAwesome5 } from "../../atoms/icons";
import { VictoryPie } from "victory-native";
import { formatDate } from "../../../context/validadores";

export default function Graphics({ navigation }) {

    const { user } = useContext(AuthContext)
    const [listMoviment, useListItem] = useState();
    const [graphicsData, useGraphicsData] = useState();
    const [listCategoryItem, useListCategory] = useState();
    const [cleanFilter, useCleanFilter] = useState();
    const [filterItem, useFilterItem] = useState('');
    const { startLoading, stopLoading } = useContext(AppContext)
    const { name, _id } = user
    const idUser = _id
    const [data_filter, useStatusFilterDate] = useState({
        date_start: '',
        date_finished: '',
        categorySelected: '',
        user_find: idUser
    });

    useEffect(() => {
        navigation.addListener('focus', () =>
            handleLoadItems()
        )
        handleLoadItems()
    }, [navigation, cleanFilter])

   

    useEffect(() => {
    }, [])

    const listCategory = async () => {
        const response = await api.get(`/categoryList/${idUser}`);
        const { categoryList } = response.data
        useListCategory(categoryList)

        const calcDataGraphics = categoryList?.filter((item) => item.value > 0)
        useGraphicsData(calcDataGraphics)
        return;
    }

    const handleLoadItems = async () => {
        startLoading({ msg: 'Carregando...' })
        await filterData()
        listCategory()
        stopLoading()
    }

    const filterData = async () => {
        startLoading({ msg: 'Carregando...' })

        await api.post('/movimentsList', data_filter)
            .then(response => {
                const { data } = response
                useListItem(data)
                stopLoading()
            })
            .catch(error => {
                stopLoading()
                console.log(error)
            })
    }

    const handleChangeStart = (text) => {
        if (text.length == 2 || text.length == 5) {
            text = text + '/'
        }
        useStatusFilterDate({
            ...data_filter, date_start: text
        })
    }

    const handleChangeFinished = (text) => {
        if (text.length == 2 || text.length == 5) {
            text = text + '/'
        }
        useStatusFilterDate({
            ...data_filter, date_finished: text
        })
    }

    async function selectItem(categoryName) {
        if (categoryName == 'todos') {
            useFilterItem('');
            useStatusFilterDate({ ...data_filter, categorySelected: categoryName })
        } else {
            useFilterItem(categoryName);
            useStatusFilterDate({ ...data_filter, categorySelected: categoryName })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', }}>
                    <View style={{ paddingTop: 30, width: '98%', alignItems: 'center' }}>
                        <Text style={styles.selectionMonth}>Selecione a data: </Text>
                        <View style={{ width: '95%', height: 30, alignItems: 'center', borderRadius: 5, flexDirection: 'row', paddingHorizontal: 5, justifyContent: 'space-between' }}>
                            <Text style={{ color: '#fff' }}>de: </Text>
                            <TextInput
                                placeholderTextColor={Colors.darkGray}
                                name="date_start"
                                value={data_filter.date_start}
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                onChangeText={(text) => handleChangeStart(text)}
                                style={{ width: 130, borderWidth: 1, borderColor: Colors.darkGray, textAlign: 'center', height: 27, borderRadius: 5, marginLeft: 2, backgroundColor: '#fff' }}
                            />
                            <Text style={{ color: '#fff' }}>até: </Text>
                            <TextInput
                                placeholderTextColor={Colors.darkGray}
                                name="date_finished"
                                value={data_filter.date_finished}
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                onChangeText={(text) => handleChangeFinished(text)}
                                style={{ backgroundColor: '#fff', width: 130, borderWidth: 1, borderColor: Colors.darkGray, textAlign: 'center', height: 27, borderRadius: 5, marginLeft: 2 }}
                            />
                        </View>
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

                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                    useFilterItem('')
                    useCleanFilter(!cleanFilter)
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
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <VictoryPie
                    data={graphicsData}
                    x="categoryName"
                    y="value"
                    colorScale={graphicsData?.map((item) => item.color)}
                    innerRadius={45}
                    padding={65}
                    width={350}
                    height={320}
                    labelPosition={({ index }) => index
                        ? "centroid"
                        : "centroid"
                    }
                    style={{
                        data: {
                            fillOpacity: 0.9, stroke: "#fff", strokeWidth: 3
                        },
                    }}



                />
            </View>

            <View style={{ height: 200, paddingHorizontal: 12 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {listCategoryItem == '' ? <Text style={{ fontSize: 15, textAlign: 'center', paddingTop: 40 }}> Sem Movimentações </Text> :
                        listCategoryItem?.map((item) => (
                            <TouchableOpacity key={item._id} style={styles.containerList}>
                                <View style={{ height: '100%', width: 5, backgroundColor: item.color }}></View>
                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 12 }}>
                                    <Text style={styles.label}>{item.categoryName}</Text>
                                    <Text style={{ fontSize: 15 }}>R$ {
                                        listMoviment?.filter((moviments) => moviments.category == item.categoryName)
                                            .map((list) => list.value)
                                            .reduce((acc, cur) => acc += cur, 0).toFixed(2)
                                    }</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 17,
        color: '#fff',
        bottom: 17
    },
    selectionDate: {
        textAlign: 'center',
        paddingBottom: 0,
        fontSize: 16,
        color: '#fff',
    },
    listCategoryItem: {
        fontSize: 16,
        textAlign: 'center'
    },
    containerList: {
        height: 60,
        flex: 1,
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        flexDirection: 'row',
    },
    content: {
        justifyContent: 'flex-end',
        marginTop: 2,
        marginBottom: 8
    },
    date: {
        color: Colors.lightGray,
        fontWeight: '600'
    },
    label: {
        fontSize: 17
    },
    value: {
        fontWeight: '600',
        fontSize: 16,
        color: '#006400'
    },
})