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
    const [listCategoryItem, useListCategory] = useState();
    const [cleanFilter, useCleanFilter] = useState();
    const [filterItem, useFilterItem] = useState('');
    const [dataPieGraphics, useDataPieGraphics] = useState('');
    const [showList, useShowList] = useState(true);
    const [showDate, useShowDate] = useState(false);
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
        handleLoadItems()
    }, [navigation, cleanFilter])

    const listCategory = async () => {
        const response = await api.get(`/categoryList/${idUser}`);
        const { categoryList } = response.data
        useListCategory(categoryList)
        return;
    }

    const handleLoadItems = async () => {
        startLoading({ msg: 'Carregando...' })
        await filterData()
        listCategory()
        stopLoading()
    }

    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

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
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={!showDate ? { paddingTop: 18 } : { paddingTop: 50 }}>
                        <Text style={styles.selectionMonth}>Selecione a data: </Text>
                        <TouchableOpacity style={{
                            padding: 5,
                            width: 'auto',
                            backgroundColor: Colors.primary,
                            marginTop: 15,
                            borderRadius: 5,
                            borderColor: Colors.lightGray,
                            borderWidth: 0.5,
                            marginBottom: 20,
                            height: 32,
                            justifyContent: 'center',

                        }}
                            onPress={(e) => {
                                useShowDate(!showDate)
                            }}>
                            <Text style={data_filter.date_start != '' ? { textAlign: 'center', fontSize: 13, color: Colors.lightGray } : { textAlign: 'center', fontSize: 17, color: Colors.lightGray }}>{data_filter.date_start != '' ? `${data_filter.date_start} - ${data_filter.date_finished}` : '-'}</Text>
                        </TouchableOpacity>
                        {showDate ?
                            <View style={{ backgroundColor: '#fff', width: 180, height: 30, top: -15, alignItems: 'center', borderRadius: 5, flexDirection: 'row' }}>
                                <TextInput
                                    placeholder="de:"
                                    placeholderTextColor={Colors.darkGray}
                                    name="date_start"
                                    value={data_filter.date_start}
                                    underlineColorAndroid={'rgba(0,0,0,0)'}
                                    onChangeText={(text) => handleChangeStart(text)}
                                    style={{ width: 80, borderWidth: 1, borderColor: Colors.darkGray, textAlign: 'center', height: 27, borderRadius: 3, marginLeft: 2 }}
                                />
                                <Text> -</Text>
                                <TextInput
                                    placeholder="até:"
                                    placeholderTextColor={Colors.darkGray}
                                    name="date_finished"
                                    value={data_filter.date_finished}
                                    underlineColorAndroid={'rgba(0,0,0,0)'}
                                    onChangeText={(text) => handleChangeFinished(text)}
                                    style={{ width: 80, borderWidth: 1, borderColor: Colors.darkGray, textAlign: 'center', height: 27, borderRadius: 3, marginLeft: 5 }}
                                />
                            </View>
                            : ''
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
                                    borderWidth: 0.5,
                                    height: 32
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

                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {
                    useFilterItem('')
                    useShowDate(false)
                    useShowList(true)
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
                    data={listMoviment}
                    x="label"
                    y="value"
                    colorScale={"green"}
                    innerRadius={45}
                    animate={{
                        duration: 200,
                        easing: "back"
                    }}
                    width={350}
                    height={320}
                />
            </View>

            <View style={{height: 200}}>
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
    listCategoryItem: {
        fontSize: 16,
        textAlign: 'center'
    },
    containerList: {
        padding: 7,
        paddingHorizontal: 20,
        flex: 1,
        marginTop: 8,
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
})