import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import api from '../../../config/api';
import { AppContext } from '../../../context/validators/AppContext';
import { AuthContext } from '../../../context/validators/AuthContext';
import Colors from '../../atoms/Colors';
import { FontAwesome5, Ionicons } from '../../atoms/icons';
import { Spacer } from '../../atoms/Spacer';
import Avatar from '../../organisms/Avatar';
import { VictoryPie } from "victory-native"
import filtro, { listMonths } from '../../../interface/month-select';

export default function Dashboard({ navigation }) {

  const [valueTotal, useValueTotal] = useState("");
  const [dataGraphic, useDataGraphic] = useState([income = {}, expense = {}, investing = {}]);
  const [incomeStatus, useIncomeStatus] = useState("");
  const [expenseStatus, useExpenseStatus] = useState("");
  const [showInvestment, setShowInvestment] = useState(false);
  const [showButtonAddMoviment, setShowButtonAddMoviment] = useState(false);
  const [listFilterMoviments, useListFilterMoviments] = useState();
  const [listFilterInvestments, useListFilterInvestments] = useState();
  const { startLoading, stopLoading, startMessage, stopMessage } = useContext(AppContext)
  const { user } = useContext(AuthContext)
  const { name, _id } = user
  const userName = name.split(" ")[0];
  const [monthSelect, useMonthSelect] = useState();
  const [showMonth, useShowMonth] = useState(false);
  const [totalValueInvestiment, setTotalValueInvestiment] = useState()

  useEffect(() => {
    navigation.addListener('focus', () =>

      filterMovimentsMonth(),
      filterInvestimentsMonth()
    )
    filterMovimentsMonth(),
      filterInvestimentsMonth()
  }, [monthSelect, navigation])

  const filterMovimentsMonth = useCallback(async () => {
    const filterMoviments = await filtro(monthSelect)
    await api.post('/movimentsList', { ...filterMoviments, user_find: user._id })
      .then(response => {
        const { data } = response
        useListFilterMoviments(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [monthSelect])

  const filterInvestimentsMonth = useCallback(async () => {
    const filterInvestiments = await filtro(monthSelect)
    await api.post('/investmentList', { ...filterInvestiments, user_find: user._id })
      .then(response => {
        const { data } = response
        useListFilterInvestments(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [monthSelect])

  const handleLoadItems = async () => {
    calculationValues()
    setShowButtonAddMoviment(false)
  }

  useEffect(() => {
    startMessage({ alertMessage: 'MyBank' })
  }, [])

  useEffect(() => {
    startLoading({ msg: 'Carregando...' }),
      handleLoadItems(),
      stopLoading()
  }, [listFilterInvestments, listFilterMoviments])

  const calculationValues = async () => {
    const amountExpanse = listFilterMoviments?.
      filter((item) => item.type == 'expense').
      map((item) => Number(item.value))?.reduce((acc, cur) => acc + cur, 0);

    const amountIncome = listFilterMoviments?.
      filter((item) => item.type == 'income').
      map((item) => Number(item.value))?.reduce((acc, cur) => acc + cur, 0);

    const amountInvesting = listFilterInvestments?.
      map((item) => Number(item.value))?.reduce((acc, cur) => acc + cur, 0);

    //calculo % grafico
    const incomeGraphicPorcent = `${amountIncome > 0 ? (amountIncome / (amountIncome + amountExpanse + amountInvesting) * 100).toString().split(".")[0] : 0}%`
    const expenseGraphicPorcent = `${amountExpanse > 0 ? (amountExpanse / (amountIncome + amountExpanse + amountInvesting) * 100).toString().split(".")[0] : 0}%`
    const investingGraphicPorcent = `${amountInvesting > 0 ? (amountInvesting / (amountIncome + amountExpanse + amountInvesting) * 100).toString().split(".")[0] : 0}%`

    useDataGraphic([income = { label: incomeGraphicPorcent, value: amountIncome, color: 'green', },
    expense = { label: expenseGraphicPorcent, value: amountExpanse, color: 'red', },
    investing = { label: investingGraphicPorcent, value: amountInvesting, color: '#8a2be2' }
    ])

    //dados para status dash
    const valueTotalStatus = (amountIncome - (amountExpanse + amountInvesting)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    useExpenseStatus(`R$ ${amountExpanse?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`);
    useIncomeStatus(`R$ ${amountIncome?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`);
    useValueTotal(`R$ ${valueTotalStatus}`);
    setTotalValueInvestiment(`R$ ${amountInvesting?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`);
  }

  async function selectItem(month) {
    useMonthSelect(month);
  }

  return (

    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={{ display: 'flex', top: 65, height: 50, marginLeft: 6 }}>
          <Avatar />
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={{ marginTop: 45, flex: 1, alignItems: 'center', right: 28 }}>
          {!showMonth ?
            <TouchableOpacity style={{ borderColor: Colors.lightGray, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }} onPress={() => {
              useShowMonth(!showMonth)
            }}>
              <Text style={{ color: Colors.lightGray, display: 'flex', fontSize: 17 }}> {monthSelect ? monthSelect : 'selecione o mês'}</Text>
              <Ionicons name='chevron-forward' color={'#A9A9A9'} size={20} />
            </TouchableOpacity>
            :
            <ScrollView horizontal={true} style={{ width: 200, minHeight: 25, borderBottomWidth: 1, borderColor: Colors.lightGray }}>
              {listMonths?.map((item) => (
                <View key={item.id} style={{ backgroundColor: Colors.primary, borderColor: Colors.lightGray, width: 100, alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => {
                    selectItem(item.month)
                    useShowMonth(!showMonth)
                  }}>
                    <Text style={{ color: Colors.lightGray, fontSize: 18, fontWeight: '500' }}>{item.month}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          }
          <Text style={{ color: Colors.primaryText, top: 10, display: 'flex', height: 50, fontSize: 30, fontWeight: '700' }}>
            {valueTotal !== '' || valueTotal !== undefined ? valueTotal : '...'}</Text>
          <Text style={{ color: Colors.lightGray, display: 'flex', height: 30, }}> Saldo em conta</Text>
        </View>
      </View>

      <View style={styles.containerDash}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
          <TouchableOpacity style={styles.boxRevenue}>
            <Text style={{ color: Colors.darkGray, fontSize: 15 }}>Receita:</Text>
            <Text style={{ color: '#006400', fontSize: 20, fontWeight: '700' }}>{incomeStatus !== '' ? incomeStatus : '...'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxSpend}>
            <Text style={{ color: Colors.darkGray, fontSize: 15, }}>Despesa:</Text>
            <Text style={{ color: '#8B0000', fontSize: 20, fontWeight: '700' }}>{expenseStatus !== '' ? expenseStatus : '...'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ height: '100%', marginBottom: 20 }}>
        <View style={styles.viewGraphic}>
          <VictoryPie
            data={dataGraphic}
            x={dataGraphic.percent}
            y="value"
            colorScale={dataGraphic.map((item) => item.color)}
            innerRadius={30}
            padding={40}
            width={350}
            height={200}
            labels={({ datum }) => datum.x}
            labelPosition={({ index }) => index
              ? "centroid"
              : "centroid"
            }
            style={{ labels: { fill: "black", fontSize: 15 } }}
          />
          <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between', bottom: 15, marginTop: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'red', width: 8, height: 5, marginRight: 5 }}></View>
              <Text style={{}}>Despesa</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'green', width: 8, height: 5, marginRight: 5 }}></View>
              <Text>Receita</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#8a2be2', width: 8, height: 5, marginRight: 5 }}></View>
              <Text>Investido</Text>
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
            <Text style={{ marginLeft: 20 }}>Movimentações por categoria</Text>
            <Ionicons name='chevron-forward' color={'#A9A9A9'} size={20} />
          </TouchableOpacity>
        </View>

        <Spacer size={2} />

        <View style={{ width: '100%', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {
            setShowInvestment(!showInvestment)
          }}
            style={{ paddingVertical: 20, width: '90%', borderRadius: 5, borderWidth: 1, borderColor: Colors.lightGray }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <Text style={{ bottom: 10, marginLeft: 10, color: Colors.lightGray }}>Investimentos</Text>
              <Ionicons name={showInvestment ? 'eye-sharp' : 'eye-off-sharp'} size={20} color={Colors.secondaryDisabled} style={{ paddingRight: 8, justifyContent: 'center', }} onPress={() => {
                setShowInvestment(!showInvestment)
              }} />
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={showInvestment ? { marginLeft: 20 } : { marginLeft: 20, marginTop: 14 }}>Valor Investido:</Text>
                {showInvestment ?
                  <Text style={{ marginLeft: 30, justifyContent: 'flex-end', fontSize: 25, top: 5, color: '#8a2be2', fontWeight: 'bold' }}>{totalValueInvestiment ? totalValueInvestiment : 'R$ ---'}</Text>
                  :
                  <View style={{ marginLeft: 30, backgroundColor: Colors.lightGray, width: 130, height: 20, opacity: 0.5 }}>
                  </View>}
              </View>
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { navigation.navigate('investiment') }}>
                <Text style={{
                  borderBottomWidth: 1, borderStyle: 'dashed', width: '60%',
                  color: Colors.primary, textAlign: 'center', top: 15
                }}>
                  detalhes dos Investimentos
                </Text>
              </TouchableOpacity>
            </View>


          </TouchableOpacity>

        </View>
        <Spacer size={8} />

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
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
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