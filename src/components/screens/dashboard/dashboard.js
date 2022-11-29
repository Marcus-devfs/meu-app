import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList } from 'react-native';
import api from '../../../config/api';
import { AuthContext } from '../../../context/validators/AuthContext';
import Colors from '../../atoms/Colors';
import { Spacer } from '../../atoms/Spacer';
import Actions from '../../Moviments/Actions';
import Moviments from '../../Moviments/moviments';

import Avatar from '../../organisms/Avatar';

export default function Dashboard({ navigation }) {

  const [valueTotal, useValueTotal] = useState("R$ 2.500,00");

  useEffect(() => {
  
  }, [])

  const { user } = useContext(AuthContext)
  const { name, _id } = user

  const userName = name.split(" ")[0];
  const idUser = _id

  useEffect(() => {
    movimentList();
  })


  const [listMoviment, useListItem] = useState();

  const movimentList = async () => {

    const response = await api.get(`/moviments`);
    const { msg } = response.data
    // const { value } = msg
    const list = msg.filter(list => list.createdBy === idUser)
    useListItem(list);
    return;
  }

  // const { value } = listMoviment
  // console.log('dindin', value);


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
        <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 10, color: Colors.darkGray, }}>Ultimas movimentações</Text>

        <FlatList
          style={styles.list}
          data={listMoviment}
          keyExtractor={(item) => String(item._id)}
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
    maxHeight: 300,
  },
});