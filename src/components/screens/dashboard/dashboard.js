import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import api from '../../../config/api';
import { AppContext } from '../../../context/validators/AppContext';
import { AuthContext } from '../../../context/validators/AuthContext';
import Colors from '../../atoms/Colors';
import { FontAwesome5, Ionicons } from '../../atoms/icons';
import { Spacer } from '../../atoms/Spacer';
import Actions from '../../Moviments/Actions';
import Avatar from '../../organisms/Avatar';
import { formatDate } from '../../../context/validadores';

export default function Dashboard({ navigation }) {

  const [valueTotal, useValueTotal] = useState("");
  const [incomeStatus, useIncomeStatus] = useState("");
  const [expenseStatus, useExpenseStatus] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [showButtonAddMoviment, setShowButtonAddMoviment] = useState(false);
  const [listMoviment, useListItem] = useState();
  const { startLoading, stopLoading, loading } = useContext(AppContext)
  const { user } = useContext(AuthContext)
  const { name, _id } = user
  const userName = name.split(" ")[0];

  useEffect(() => {
    navigation.addListener('focus', () =>
      handleLoadItems()
    )
  }, [navigation, listMoviment])

  useEffect(() => {
    const amountExpanse = listMoviment?.
      filter((item) => item.type == 'expense').
      map((item) => Number(item.value));

    const amountIncome = listMoviment?.
      filter((item) => item.type == 'income').
      map((item) => Number(item.value));

    const expenseStatusCalc = amountExpanse?.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const incomeStatusCalc = amountIncome?.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const valueTotalStatus = Math.abs(incomeStatusCalc - expenseStatusCalc).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    useExpenseStatus(`R$ ${expenseStatusCalc}`);
    useIncomeStatus(`R$ ${incomeStatusCalc}`);
    useValueTotal(`R$ ${valueTotalStatus}`);

  }, [listMoviment])

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

  async function deleteMoviment(_id) {
    await api.delete(`/moviment/${_id}`);
    const newList = listMoviment.filter((item) => item._id !== _id);
    useListItem(newList);

    Alert.alert('MyBank', 'Movimentação deletada!')
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={{ display: 'flex', top: 60, height: 50, marginLeft: 6 }}>
          <Avatar />
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={{ marginTop: 55 }}>
          <Text style={{ color: Colors.lightGray, display: 'flex', height: 30, marginLeft: 80 }}> Saldo em conta</Text>
          <Text style={{ color: Colors.primaryText, display: 'flex', height: 50, fontSize: 30, marginLeft: 45, fontWeight: '700' }}>
            {valueTotal !== '' || valueTotal !== undefined ? valueTotal : '...'}</Text>
        </View>
      </View>
      <View style={styles.containerDash}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
          <TouchableOpacity style={styles.boxRevenue}>
            <Text style={{ color: Colors.darkGray, fontSize: 15 }}>Receita:</Text>
            <Text style={{ color: '#006400', fontSize: 20, fontWeight: '700' }}>{incomeStatus !== '' ? incomeStatus.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '...'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxSpend}>
            <Text style={{ color: Colors.darkGray, fontSize: 15, }}>Dispesas:</Text>
            <Text style={{ color: '#8B0000', fontSize: 20, fontWeight: '700' }}>{expenseStatus !== '' ? expenseStatus.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '...'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Spacer size={7} />
      <View style={{ height: 100, backgroundColor: Colors.lightGray }}>
        <Text> Dashboard</Text>
      </View>
      {/* <Actions /> */}
      <View style={{ width: '100%', minHeight: 270, maxHeight: 270 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 10, color: Colors.darkGray, }}>Ultimas movimentações</Text>
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
                      <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteMoviment(item._id)}>
                        <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center' }}>Apagar</Text>
                      </TouchableOpacity>
                    ) : ""}
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>
      <Spacer size={1} />
      <StatusBar style="auto" />

      {showButtonAddMoviment ?
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{ marginBottom: 5 }}>
            <TouchableOpacity style={{ backgroundColor: Colors.primary, paddingHorizontal: 10, marginBottom: 5, marginRight: 5, borderRadius: 5 }}
              onPress={() => navigation.navigate('depositControll')}>
              <Text style={{ color: '#fff' }}> Receitas +</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: '#B22222', paddingHorizontal: 10, marginRight: 5, borderRadius: 5 }}
              onPress={() => navigation.navigate('spendControll')}>
              <Text style={{ color: '#fff' }}>Dispesas --</Text>
            </TouchableOpacity>
          </View>
        </View>
        : ''}
      <View style={showButtonAddMoviment ? { alignItems: 'flex-end', marginRight: 20 } : { alignItems: 'flex-end', marginRight: 20, top: 40 }}>
        <TouchableOpacity style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.primary,
          width: 60,
          height: 60,
          borderRadius: 30
        }} onPress={() => {
          setShowButtonAddMoviment(!showButtonAddMoviment)
        }}>
          <FontAwesome5 name="cart-plus" size={35} color={'#fff'}></FontAwesome5>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userName: {
    color: Colors.lightGray,
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 10,
    marginTop: 5
  },
  containerHeader: {
    flexDirection: 'row',
    backgroundColor: '#06373d',
    width: '100%',
    minHeight: 150,
    maxHeight: 150,
    justifyContent: 'flex-start',
  },
  containerDash: {
    flex: 1,
    backgroundColor: '#fff',
    maxHeight: 15,
    width: '100%',
  },
  boxRevenue: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 10,
    width: '45%',
    height: 60,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 20,
  },
  boxSpend: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    width: '45%',
    height: 60,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 20,
  },
  list: {
    padding: 14,
    marginTop: 10,
    width: '100%',
    maxHeight: 330,
  },
  containerList: {
    flex: 1,
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightGray
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