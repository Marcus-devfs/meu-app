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



export default function AboutUs() {

    const { user } = useContext(AuthContext)
    const { name, _id, email } = user

    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];

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
            <Spacer size={4} />
            <Text style={{ fontSize: 18, textAlign: 'center', color: Colors.primary, fontWeight: 'bold' }}>Sobre o app</Text>
            <Spacer size={2} />
            <View style={{ flex: 1}}>
                <View style={{ padding: 20 }}>
                    <Text>O aplicativo foi desenvolvido com o intuito de facilitar o controle das suas finanças no dia a dia</Text>
                    <Spacer size={2} />
                    <Text>Com ele você pode:</Text>
                    <Spacer size={2} />
                    <View>
                        <Text>- Controlar suas despesas e receitas</Text>
                        <Text>- Acompanhar a quantia gasta por dia, mês e ano</Text>
                        <Text>- Ter o relatório por categoria</Text>
                        <Text>- Controlar seus investimentos</Text>
                    </View>
                    <Spacer size={2} />

                    <Text>E muito mais!</Text>
                </View>
                <View style={{ alignItems: 'center', paddingTop: 180 }}>
                    <Text>Sugestões, duvidas ou ajuda, enviar email para:</Text>
                    <Text style={{color: Colors.primary, fontWeight: 'bold', fontSize: 15, marginTop: 5}}>{email}</Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        padding: 25,
        justifyContent: 'space-between',

    },
    menuItemText: {
        color: Colors.primary,
        fontWeight: 'bold',
    },

});