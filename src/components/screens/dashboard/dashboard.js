import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Button } from 'react-native';
import colors from '../../atoms/colors';
import { Spacer } from '../../atoms/Spacer';
import Avatar from '../../organisms/Avatar';




export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Spacer size={3} />
      <View style={styles.containerHeader}>
        <View style={{ display: 'flex', marginTop: 20, height: 60, marginLeft: 6 }}>
          <Avatar />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: colors.lightGray, display: 'flex', height: 30, marginLeft: 80 }}> Saldo em conta</Text>
          <Text style={{ color: colors.primaryText, display: 'flex', height: 50, fontSize: 25, marginLeft: '27%', fontWeight: '700' }}>
            R$2.500,99</Text>

        </View>
      </View>
      <View style={styles.containerDash}>
        <Text style={styles.titleName}>Bem vindo ao MyBank!</Text>
        <Text style={styles.subTitle}>Seu aplicativo de controle financeiro... 😎</Text>
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
    backgroundColor: colors.primary,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  containerHeader: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#06373d',
    width: '100%',
    height: 120,
    justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  containerDash: {
    flex: 1,
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%'
  },
  subTitle: {
    color: '#06373d',
    marginTop: 20,

  },
  titleName: {
    paddingTop: 80,
    alignItems: 'center',

  },
});