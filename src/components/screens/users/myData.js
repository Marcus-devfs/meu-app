import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Divider } from '../../atoms/Divider';
import Header, { name } from '../../organisms/header'
import { Ionicons } from '../../atoms/icons';
import { Spacer } from '../../atoms/Spacer';
import Colors from '../../atoms/Colors';
import { AuthContext } from '../../../context/validators/AuthContext';
import Avatar from '../../organisms/Avatar';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../../../context/validadores';



export default function MyData() {
    const { user } = useContext(AuthContext)
    const { name, _id, email, telephone, dateBirth } = user
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    const navigation = useNavigation()
    const userName = `${firstName} ${lastName}`
    const { handleLogout } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={{ display: 'flex', marginTop: 55, height: 50, alignItems: 'center' }}>
                    <Avatar />
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#fff', padding: 15 }}>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>Meus Dados:</Text>
            </View>
            <Spacer size={1} />
            <View style={{ backgroundColor: '#fff' }}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>E-mail: </Text>
                    <Text style={styles.infoData}>{email}</Text>
                </TouchableOpacity>
                <Divider style={styles.divider} />
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Nome completo: </Text>
                    <Text style={styles.infoData}>{name}</Text>
                </TouchableOpacity>
                <Divider style={styles.divider} />
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>ID usuário: </Text>
                    <Text style={styles.infoData}>{_id}</Text>
                </TouchableOpacity>
                <Divider style={styles.divider} />
                <TouchableOpacity style={styles.menuItemEdit}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.menuItemText}>Telefone: </Text>
                        <Text style={styles.infoData}>{telephone}</Text>
                    </View>
                    <Ionicons name='chevron-forward' color={'#A9A9A9'} size={16} />
                </TouchableOpacity>
                <Divider style={styles.divider} />
                <TouchableOpacity style={styles.menuItemEdit}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.menuItemText}>Data de Nascimento: </Text>
                        <Text style={styles.infoData}>{formatDate({ date: dateBirth })}</Text>
                    </View>
                    <Ionicons name='chevron-forward' color={'#A9A9A9'} size={16} />
                </TouchableOpacity>
                <Divider style={styles.divider} />
            </View>
            <Spacer size={2} />
            <View style={{ backgroundColor: '#fff' }}>
                <TouchableOpacity style={styles.menuItemEdit} onPress={() => navigation.navigate('upDatePass')}>
                    <Text style={styles.menuItemText}>Alterar senha</Text>
                    <Ionicons name='chevron-forward' color={'#A9A9A9'} size={16} />
                </TouchableOpacity>
                <Divider style={styles.divider} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    containerHeader: {
        flexDirection: 'row',
        backgroundColor: '#06373d',
        width: '100%',
        minHeight: 150,
        maxHeight: 150,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    userName: {
        color: Colors.lightGray,
        fontSize: 14,
        textAlign: 'center',
        marginLeft: 10,
        marginTop: 5
    },
    containerInfos: {
        width: "98%",
        flexDirection: 'row',
        padding: 5
    },
    divider: {
        width: "100%",
        backgroundColor: '#A9A9A9',
    },
    menuItem: {
        // flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',

    },
    menuItemText: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    menuItemEdit: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

});