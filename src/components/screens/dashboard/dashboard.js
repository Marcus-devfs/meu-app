import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList } from 'react-native';
import api from '../../../config/api';
import { AuthContext } from '../../../context/validators/AuthContext';
import Colors from '../../atoms/Colors';
import { Spacer } from '../../atoms/Spacer';
import Actions from '../../Moviments/Actions';
import Moviments from '../../Moviments/moviments';

import Avatar from '../../organisms/Avatar';

const listItem = [
  {
    id: 1,
    label: 'Boleto internet',
    value: '105,00',
    date: '20/11/2022',
    type: 0 // dispesas,
  },
  {
    id: 2,
    label: 'Aluguel',
    value: '1500,00',
    date: '15/11/2022',
    type: 0 // dispesas,
  },
  {
    id: 3,
    label: 'Combustivel',
    value: '300,00',
    date: '30/11/2022',
    type: 0 // dispesas,
  },
  {
    id: 4,
    label: 'Salário',
    value: '3500,00',
    date: '30/11/2022',
    type: 1 // Receita,
  },
  {
    id: 5,
    label: 'Bônus',
    value: '1000,00',
    date: '15/11/2022',
    type: 1 // Receita,
  },
  {
    id: 6,
    label: '13º Salário',
    value: '3500,00',
    date: '30/11/2022',
    type: 1 // Receita,
  },
  {
    id: 7,
    label: 'Mercado',
    value: '1200,00',
    date: '20/11/2022',
    type: 0 // dispesas,
  },
]


export default function Dashboard({ navigation, list }) {

  const movimentList = async () => {

    const response = await api.get('/moviments');
    const { data } = response
    const { msg } = data
    const list = msg;

    console.log('const aqui 2', list);

    return list
  }

  

  const { user } = useContext(AuthContext)
  const { name } = user

  const userName = name.split(" ")[0];

  return (
    <View style={styles.container}>

      <View style={styles.containerHeader}>

        <View style={{ display: 'flex', marginTop: 55, height: 50, marginLeft: 6 }}>
          <Avatar />
          <Text style={styles.userName}>{userName}</Text>
        </View>

        <View style={{ marginTop: 45 }}>
          <Text style={{ color: Colors.lightGray, display: 'flex', height: 30, marginLeft: 65 }}> Saldo em conta</Text>
          <Text style={{ color: Colors.primaryText, display: 'flex', height: 50, fontSize: 28, marginLeft: 45, fontWeight: '700' }}>
            R$2.500,00</Text>
        </View>

      </View>

      <View style={styles.containerDash}>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

          <TouchableOpacity style={styles.boxRevenue} onPress={movimentList()}>
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
      <View style={{ width: '100%', minHeight: 200, }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 10, color: Colors.darkGray, }}>Ultimas movimentações</Text>

        <FlatList
          style={styles.list}
          data={listItem}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Moviments data={item} />}
        />

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
    minHeight: 145,
    maxHeight: 145,
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
    maxHeight: 260,
  },
});