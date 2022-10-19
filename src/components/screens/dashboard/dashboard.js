import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList } from 'react-native';
import { dataBase } from '../../../config/date';
import Colors from '../../atoms/Colors';
import { Spacer } from '../../atoms/Spacer';
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
]

export default function Dashboard({ navigation, list }) {
  return (
    <View style={styles.container}>
      <Spacer size={3} />
      <View style={styles.containerHeader}>
        <View style={{ display: 'flex', marginTop: 20, height: 60, marginLeft: 6 }}>
          <Avatar />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: Colors.lightGray, display: 'flex', height: 30, marginLeft: 65 }}> Saldo em conta</Text>
          <Text style={{ color: Colors.primaryText, display: 'flex', height: 50, fontSize: 28, marginLeft: 45, fontWeight: '700' }}>
            R$2.500,00</Text>
        </View>
      </View>
      <View style={styles.containerDash}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.boxRevenue}>
            <Text style={{ color: Colors.darkGray, fontSize: 15 }}>Receita:</Text>
            <Text style={{ color: '#006400', fontSize: 20, fontWeight: '700' }}>R$ 3.500,00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxSpend}>
            <Text style={{ color: Colors.darkGray, fontSize: 15, }}>Dispesas:</Text>
            <Text style={{ color: '#8B0000', fontSize: 20, fontWeight: '700' }}>R$ 1.000,00</Text>
          </TouchableOpacity>
        </View>
        <Spacer size={3} />
        <Text>Últimas movimentações</Text>
        <FlatList
          style={styles.list}
          data={listItem}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Moviments data={item}/>}
        />
        <Spacer size={3} />
        <StatusBar style="auto" />
        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="Perfil"
          onPress={() => { navigation.navigate("userProfile") }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  containerHeader: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#06373d',
    width: '100%',
    height: 110,
    justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  containerDash: {
    flex: 1,
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#fff',
    maxHeight: '100%',
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
    padding: 10,
    width: '100%'
  },
});