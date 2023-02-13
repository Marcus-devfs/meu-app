import { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import api from '../../../config/api';
import { AppContext } from '../../../context/validators/AppContext';
import { AuthContext } from '../../../context/validators/AuthContext';
import Colors from '../../atoms/Colors';
import { FontAwesome5, Ionicons } from '../../atoms/icons';
import { Spacer } from '../../atoms/Spacer';
import { formatDate } from '../../../context/validadores';


export default function MovimentsEdit({ navigation }) {

    const [showButton, setShowButton] = useState(false);
    const [showButtonAddMoviment, setShowButtonAddMoviment] = useState(false);
    const [listMoviment, useListItem] = useState();
    const { startLoading, stopLoading, loading } = useContext(AppContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        navigation.addListener('focus', () =>
            handleLoadItems()
        )
    }, [navigation, listMoviment])

    const handleLoadItems = async () => {
        startLoading({ msg: 'Carregando...' })
        await movimentList()
        setShowButtonAddMoviment(false)
        stopLoading()
    }

    const movimentList = async () => {
        const response = await api.get(`/moviment/${user._id}`);
        const { moviments } = response.data
        useListItem(moviments);
        return;
    }

    async function deleteMoviment(_id, category, value) {
        await api.delete(`/moviment/${_id}`);

        const valueBeforeCategory = listMoviment?.filter((item) => item.category == category).map((item) => (item.value)).reduce((acc, cur) => acc + cur, 0)
        const valueStatusCategory = Number(valueBeforeCategory) - Number(value)

        await api.patch(`/categoryList/${user._id}`, {
            category, valueStatusCategory
        })
            .then(response => {
                console.log('sucess',response.data)
            })
            .catch(error => {
                console.log('error',error.dados)
            })

        const newList = listMoviment.filter((item) => item._id !== _id);
        useListItem(newList);
        setShowButton(!showButton)
        Alert.alert('MyBank', 'Movimentação deletada!')
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
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.darkGray, marginLeft: 40, marginTop: 15, paddingBottom: 15 }}>Ultimas movimentações</Text>
                        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => setShowButton(!showButton)}>
                            <Ionicons name="trash" size={25} color={Colors.darkGray}></Ionicons>
                        </TouchableOpacity>
                        {showButton ? (
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => setShowButton(!showButton)}>
                                <Ionicons name="close" size={25} color={Colors.darkGray}></Ionicons>
                            </TouchableOpacity>) : ''}
                    </View>

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
                                            {showButton ? (
                                                <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteMoviment(item._id, item.category, item.value)}>
                                                    <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center' }}>Apagar</Text>
                                                </TouchableOpacity>
                                            ) : ""}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                        </ScrollView>
                    </View>
                </View>

                {showButtonAddMoviment ?
                    <View style={{ alignItems: 'flex-end' }}>
                        <View style={{ bottom: 15 }}>
                            <TouchableOpacity style={{ backgroundColor: Colors.primary, paddingHorizontal: 10, marginBottom: 5, marginRight: 5, borderRadius: 5, paddingVertical: 4 }}
                                onPress={() => navigation.navigate('depositControll')}>
                                <Text style={{ color: '#fff' }}> Receitas +</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: '#B22222', paddingHorizontal: 10, marginRight: 5, borderRadius: 5, paddingVertical: 4 }}
                                onPress={() => navigation.navigate('spendControll')}>
                                <Text style={{ color: '#fff' }}>Despesas -</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : ''}

                <View style={showButtonAddMoviment ? { alignItems: 'flex-end', marginRight: 20, top: -10 } : { alignItems: 'flex-end', marginRight: 20, top: 45 }}>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.primary,
                        width: 45,
                        height: 45,
                        borderRadius: 30
                    }} onPress={() => {
                        setShowButtonAddMoviment(!showButtonAddMoviment)
                    }}>
                        <FontAwesome5 name="cart-plus" size={25} color={'#fff'}></FontAwesome5>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    containerDash: {
        flex: 1,
        backgroundColor: '#fff',
        maxHeight: 15,
        width: '100%',
        paddingVertical: 35
    },
    bodyDash: {
        width: '100%',
        height: '80%'
    },
    list: {
        marginTop: 10,
        paddingHorizontal: 2,
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
    expenses: {
        fontWeight: '600',
        fontSize: 16,
        color: '#8B0000'
    },
    valueHidde: {
        marginTop: 8,
        width: 70,
        height: 10,
        opacity: 0.5,
        borderRadius: 5,
        backgroundColor: Colors.lightGray
    },
    buttonDelete: {
        backgroundColor: 'red',
        paddingHorizontal: 6,
        paddingVertical: 4,
        textAlign: 'center',
        borderRadius: 5
    },

});