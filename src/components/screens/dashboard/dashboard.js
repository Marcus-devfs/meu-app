import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import api from '../../../config/api';
import { AppContext } from '../../../context/validators/AppContext';
import { AuthContext } from '../../../context/validators/AuthContext';
import Colors from '../../atoms/Colors';
import { FontAwesome5, Ionicons } from '../../atoms/icons';
import { Spacer } from '../../atoms/Spacer';
import Avatar from '../../organisms/Avatar';
import { formatDate } from '../../../context/validadores';
import { VictoryPie } from "victory-native"

export default function Dashboard({ navigation }) {

  const [valueTotal, useValueTotal] = useState("");
  const [expenseGraphicData, useExpenseGraphicData] = useState("");
  const [incomeGraphicData, useIncomeGraphicData] = useState("");
  const [dataGraphic, useDataGraphic] = useState([income = {}, expense = {}]);
  const [incomeStatus, useIncomeStatus] = useState("");
  const [expenseStatus, useExpenseStatus] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [showButtonAddMoviment, setShowButtonAddMoviment] = useState(false);
  const [listMoviment, useListItem] = useState();
  const { startLoading, stopLoading, loading } = useContext(AppContext)
  const { user } = useContext(AuthContext)
  const { name, _id } = user
  const userName = name.split(" ")[0];
  const [porcentIncome, usePorentIncome] = useState("");
  const [porcentExpense, usePorcentExpense] = useState("");


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

    //dados para grafico
    const expenseGraphic = Number(amountExpanse?.reduce((acc, cur) => acc + cur, 0));
    const incomeGraphic = Number(amountIncome?.reduce((acc, cur) => acc + cur, 0));
    const incomeGraphicPorcent = `${(incomeGraphic / (incomeGraphic + expenseGraphic) * 100).toString().split(".")[0]}%`
    const expenseGraphicPorcent = `${(expenseGraphic / (incomeGraphic + expenseGraphic) * 100).toString().split(".")[0]}%`
    usePorentIncome(incomeGraphicPorcent)
    usePorcentExpense(expenseGraphicPorcent)
    useExpenseGraphicData(expenseGraphic)
    useIncomeGraphicData(incomeGraphic)
    useDataGraphic([income = { label: porcentIncome, value: incomeGraphic, color: 'green', },
    expense = { label: porcentExpense , value: expenseGraphic, color: 'red', }])

    //dados para status dash
    const expenseStatusCalc = amountExpanse?.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const incomeStatusCalc = amountIncome?.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const valueTotalStatus = Math.abs(incomeStatusCalc - expenseStatusCalc).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    useExpenseStatus(`R$ ${expenseStatusCalc}`);
    useIncomeStatus(`R$ ${incomeStatusCalc}`);
    useValueTotal(`R$ ${valueTotalStatus}`);

  }, [listMoviment, navigation])

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
        <View style={{ display: 'flex', top: 65, height: 50, marginLeft: 6 }}>
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

      <ScrollView style={{height: '100%'}}>
        <View style={styles.viewGraphic}>
          <VictoryPie
            data={dataGraphic}
            x={dataGraphic.percent}
            y="value"
            colorScale={dataGraphic.map((item) => item.color)}
            innerRadius={30}
            padding={35}
            width={350}
            height={200}
            labels={({ datum }) => datum.x}
            labelPosition={({ index }) => index
              ? "centroid"
              : "endAngle"
            }
            style={{ labels: { fill: "black", fontSize: 15, } }}
          />
          <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'space-around', bottom: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'red', width: 8, height: 5, marginRight: 5 }}></View>
              <Text style={{}}>Dispesa</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'green', width: 8, height: 5, marginRight: 5 }}></View>
              <Text>Receita</Text>
            </View>
          </View>

        </View>

        <Spacer size={5} />

        <View style={{ width: '100%', alignItems: 'center' }}>
          <TouchableOpacity style={{ paddingVertical: 20, flexDirection: 'row', width: '90%', borderRadius: 5, borderWidth: 1, borderColor: Colors.lightGray, justifyContent: 'space-between' }}
            onPress={() => navigation.navigate('movimentEdit')}>
            <Text style={{ marginLeft: 20 }}>Ultimas Movimentações</Text>
            <Ionicons name='chevron-forward' color={'#A9A9A9'} size={20} />
          </TouchableOpacity>
        </View>

        <Spacer size={2} />

        <View style={{ width: '100%', alignItems: 'center' }}>
          <TouchableOpacity style={{ paddingVertical: 20, flexDirection: 'row', width: '90%', borderRadius: 5, borderWidth: 1, borderColor: Colors.lightGray, justifyContent: 'space-between' }}
            onPress={() => navigation.navigate('graphics')}>
            <Text style={{ marginLeft: 20 }}>Dispesas por categoria</Text>
            <Ionicons name='chevron-forward' color={'#A9A9A9'} size={20} />
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </ScrollView >
      {
        showButtonAddMoviment ?
          <View style={{ alignItems: 'flex-end', bottom: 50 }
          } >
            <View style={{ bottom: 15 }}>
              <TouchableOpacity style={{ backgroundColor: Colors.primary, paddingHorizontal: 10, marginBottom: 5, marginRight: 5, borderRadius: 5, paddingVertical: 4 }}
                onPress={() => navigation.navigate('depositControll')}>
                <Text style={{ color: '#fff' }}> Receitas +</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: '#B22222', paddingHorizontal: 10, marginRight: 5, borderRadius: 5, paddingVertical: 4 }}
                onPress={() => navigation.navigate('spendControll')}>
                <Text style={{ color: '#fff' }}>Dispesas -</Text>
              </TouchableOpacity>
            </View>
          </View >
          : ''
      }

      <View style={showButtonAddMoviment ? { alignItems: 'flex-end', marginRight: 20, bottom: 60 } : { alignItems: 'flex-end', marginRight: 20, bottom: 60 }}>
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
    </View >
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
    paddingVertical: 35
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
  viewGraphic: {
    // backgroundColor: 'rgba(0, 102, 0, 0.2)',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    // maxHeight: 200,
    // minHeight: 200,
    width: '92%',
    marginLeft: '4%',
    top: 20,
    marginBottom: 2,
    shadowColor: '#171717',
    backgroundColor: '#fff',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  list: {
    marginTop: 10,
    paddingHorizontal: 2,
    maxHeight: 260,
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