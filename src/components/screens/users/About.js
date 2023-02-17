import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Divider } from '../../atoms/Divider';
import Header, { name } from '../../organisms/header'
import { FontAwesome5, Ionicons } from '../../atoms/icons';
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
            <View style={{ flex: 1 }}>
                <View style={{ padding: 20 }}>
                    <Text style={{fontSize: 15}}>O aplicativo foi desenvolvido com o intuito de facilitar o controle das suas finanças no dia a dia</Text>
                    <Spacer size={2} />
                    <Text style={{fontSize: 15}}>Com ele você pode:</Text>
                    <Spacer size={4} />
                    <View style={{ width: '90%' }}>
                        <View style={styles.checkList}>
                            <FontAwesome5 name="check" size={25} color={Colors.primary} style={styles.iconList}/>
                            <Text style={styles.textList}>Controlar suas despesas e receitas</Text>
                        </View>
                        <Spacer size={1} />
                        <View style={styles.checkList}>
                            <FontAwesome5 name="check" size={25} color={Colors.primary} style={styles.iconList}/>
                            <Text style={styles.textList}>Acompanhar suas despesas por data</Text>
                        </View>
                        <Spacer size={1} />
                        <View style={styles.checkList}>
                            <FontAwesome5 name="check" size={25} color={Colors.primary} style={styles.iconList}/>
                            <Text style={styles.textList}>Ter um relatório de movimentações por categoria</Text>
                        </View>
                        <Spacer size={1} />
                        <View style={styles.checkList}>
                            <FontAwesome5 name="check" size={25} color={Colors.primary} style={styles.iconList}/>
                            <Text style={styles.textList}>Controlar seus investimentos</Text>
                        </View>
                        <Spacer size={1} />
                    </View>
                    <Spacer size={1} />

                    <Text style={{fontSize: 15}}>E muito mais!</Text>
                </View>
                <View style={{ alignItems: 'center', paddingTop: 100 }}>
                    <Text>Sugestões, duvidas ou ajuda, enviar email para:</Text>
                    <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 15, marginTop: 5 }}>marcusvf.silva@outlook.com</Text>
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
        padding: 25,
        justifyContent: 'space-between',
    },
    menuItemText: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    checkList:{
        flexDirection: 'row',
    },
    textList:{
        fontSize: 15,
        marginTop: 7
    },
    iconList:{
        marginRight: 10,
        marginTop: 5
    }

});