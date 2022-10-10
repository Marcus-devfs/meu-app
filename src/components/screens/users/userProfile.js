import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Divider } from '../../atoms/Divider';
import Header, { name } from '../../organisms/header'
import { Ionicons } from '../../atoms/icons';
import { Spacer } from '../../atoms/Spacer';
import Colors from '../../atoms/Colors';



export default function UserProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Header />
      </View>
      <Divider style={styles.divider} />
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>Meus Dados</Text>
        <Ionicons name='chevron-forward' color={'#A9A9A9'} size={16} />
      </TouchableOpacity>
      <Divider style={styles.divider} />
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>Alterar idioma</Text>
        <Ionicons name='chevron-forward' color={'#A9A9A9'} size={16} />
      </TouchableOpacity>
      <Divider style={styles.divider} />
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>Alterar senha</Text>
        <Ionicons name='chevron-forward' color={'#A9A9A9'} size={16} />
      </TouchableOpacity>
      <Divider style={styles.divider} />
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>Sair</Text>
        <Ionicons name='chevron-forward' color={'#A9A9A9'} size={16} />
      </TouchableOpacity>
      <Divider style={styles.divider} />
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  headerContainer:{
    width: '100%',
   
  },
  divider: {
    width: "100%",
    backgroundColor: '#A9A9A9',
  },
  menuItem: {
    flexDirection: 'row',
    padding: 30,
  },
  menuItemText: {
    flex: 1,
  },

});