import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export function SignUp() {
  return (
    <View style={styles.container}>

      <Text style={styles.titleName}>Bem vindo ao SAIRRR!</Text>
      <Text style={styles.subTitle}>Sair... 😎</Text>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  subTitle: {
    color: '#6a6a6a',
    marginTop: 20,

  },
  titleName: {
    paddingTop: 80,
    alignItems: 'center',

  }
});