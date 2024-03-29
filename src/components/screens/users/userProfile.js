import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Divider } from '../../atoms/Divider';
import Header, { name } from '../../organisms/header'
import { Ionicons } from '../../atoms/icons';
import { Spacer } from '../../atoms/Spacer';
import Colors from '../../atoms/Colors';
import { AuthContext } from '../../../context/validators/AuthContext';
import Avatar from '../../organisms/Avatar';
import { useNavigation } from '@react-navigation/native';



export default function UserProfile() {

  const { user } = useContext(AuthContext)
  const { name, _id } = user

  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];

  const userName = `${firstName} ${lastName}`

  const { handleLogout } = useContext(AuthContext)

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>

        <View style={{ display: 'flex', top: 60, height: 50, alignItems: 'center' }}>
          <Avatar />
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
      <View>
        <Divider style={styles.divider} />
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('myData')}>
          <Text style={styles.menuItemText}>Meus Dados</Text>
          <Ionicons name='chevron-forward' color={'#A9A9A9'} size={16} />
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('changeData')}>
          <Text style={styles.menuItemText}>Alterar dados</Text>
          <Ionicons name='chevron-forward' color={'#A9A9A9'} size={16} />
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('aboutUs')}>
          <Text style={styles.menuItemText}>Sobre o app</Text>
          <Ionicons name='chevron-forward' color={'#A9A9A9'} size={16} />
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <TouchableOpacity style={styles.menuItem} onPress={() => handleLogout()}>
          <Text style={styles.menuItemText}>Sair</Text>
          <Ionicons name='chevron-forward' color={'#A9A9A9'} size={16} />
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <StatusBar style="auto" />
      </View>
      <View style={{marginTop: 180}}>
        <Text style={{ color: Colors.lightGray, textAlign: 'center' }}> Versão atual: 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerHeader: {
    flexDirection: 'row',
    backgroundColor: '#06373d',
    width: '100%',
    minHeight: 150,
    maxHeight: 150,
    justifyContent: 'center',
  },
  userName: {
    color: Colors.lightGray,
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 10,
    marginTop: 10
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