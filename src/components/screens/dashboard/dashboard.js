import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList, Alert, SafeAreaView } from 'react-native';
import api from '../../../config/api';
import { AppContext } from '../../../context/validators/AppContext';
import { AuthContext } from '../../../context/validators/AuthContext';
import Colors from '../../atoms/Colors';
import { FontAwesome5, Ionicons } from '../../atoms/icons';
import { Spacer } from '../../atoms/Spacer';
import Actions from '../../Moviments/Actions';
import Moviments from '../../Moviments/moviments';

import Avatar from '../../organisms/Avatar';

export default function Dashboard({ navigation }) {

  const [valueTotal, useValueTotal] = useState("R$ 2.500,00");
  const { startLoading, stopLoading, loading } = useContext(AppContext)

  const { user } = useContext(AuthContext)
  const { name, _id } = user

  const userName = name.split(" ")[0];
  const idUser = _id

  useEffect(() => {
    navigation.addListener('focus', () =>
      handleLoadItems()
    )
  }, [navigation])

  const handleLoadItems = async () => {
    startLoading({ msg: 'Carregando...' })
    await movimentList()
    stopLoading()
  }


  const [listMoviment, useListItem] = useState();

  const movimentList = async () => {
    const response = await api.get(`/moviment/${idUser}`);
    const { moviments } = response.data
    useListItem(moviments);
    return;
  }

  const [showButton, setShowButton] = useState(false);

  async function deleteMoviment(_id) {
    const response = await api.delete(`/moviment/${_id}`);
    const newList = listMoviment.filter((item) => item._id !== _id);
    useListItem(newList);
    console.log('mensagem', response);
    console.log('aqui id', _id);
    Alert.alert('MyBank', 'Movimentação deletada!')

  }

  return (
    <View style={styles.container}>

      <View style={styles.containerHeader}>

        <View style={{ display: 'flex', marginTop: 55, height: 50, marginLeft: 6 }}>
          <Avatar />
          <Text style={styles.userName}>{userName}</Text>
        </View>

        <View style={{ marginTop: 55 }}>
          <Text style={{ color: Colors.lightGray, display: 'flex', height: 30, marginLeft: 65 }}> Saldo em conta</Text>
          <Text style={{ color: Colors.primaryText, display: 'flex', height: 50, fontSize: 28, marginLeft: 45, fontWeight: '700' }}>
            {valueTotal}</Text>
        </View>

      </View>

      <View style={styles.containerDash}>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

          <TouchableOpacity style={styles.boxRevenue}>
            <Text style={{ color: Colors.darkGray, fontSize: 15 }}>Receita:</Text>
            <Text style={{ color: '#006400', fontSize: 20, fontWeight: '700' }}>R$ 3.500,00</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.boxSpend}>
            <Text style={{ color: Colors.darkGray, fontSize: 15, }}>Dispesas:</Text>
            <Text style={{ color: '#8B0000', fontSize: 20, fontWeight: '700' }}>R$ 1.000,00</Text>
          </TouchableOpacity>
        </View>

      </View>


      <Actions />

      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={{ width: '100%', minHeight: 300, }}>
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

        {/* <FlatList
          style={styles.list}
          data={listMoviment}
          keyExtractor={(item) => String(item._id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Moviments data={item} />}
        /> */}
        <View style={styles.list}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {listMoviment == '' ? <Text style={{fontSize: 15, textAlign: 'center', paddingTop: 40}}> Sem Movimentações </Text> : 
            listMoviment?.map((item) => (
              <TouchableOpacity key={item._id} style={styles.containerList}>
                <Text style={styles.date}>{item.createdAt}</Text>
                <View style={styles.content}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={item.type == 'income' ? styles.value : styles.expenses}>
                    {item.type == 'income' ? `R$ ${item.value}` : `R$ -${item.value}`}
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
      {/* </ScrollView> */}
      <Spacer size={1} />
      <StatusBar style="auto" />
      {/* <Button
        buttonStyle={{ marginTop: 1 }}
        backgroundColor="#03A9F4"
        title="Perfil"
        onPress={() => { navigation.navigate("userProfile") }}
      /> */}
    </View>
    // </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.primary,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
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
    // alignItems: 'center',
  },
  containerDash: {
    flex: 1,
    // alignItems: 'center',
    // borderTopRightRadius: 15,
    // borderTopLeftRadius: 15,
    backgroundColor: '#fff',
    maxHeight: 15,
    width: '100%'
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
    // backgroundColor: 'red',
    padding: 14,
    marginTop: 10,
    width: '100%',
    maxHeight: 350,
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