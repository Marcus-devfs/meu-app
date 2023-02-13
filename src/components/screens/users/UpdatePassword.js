import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Divider } from '../../atoms/Divider';
import Header, { name } from '../../organisms/header'
import { Ionicons } from '../../atoms/icons';
import { Spacer } from '../../atoms/Spacer';
import Colors from '../../atoms/Colors';
import { AuthContext } from '../../../context/validators/AuthContext';
import Avatar from '../../organisms/Avatar';
import { uptadeNewPassword } from '../../../interface/auth-interface';
import { useNavigation } from '@react-navigation/native';



export default function UpDatePass() {

    const { user } = useContext(AuthContext)
    const [updatePassword, useUpDatePasswordPassword] = useState({
        email: '',
        senha: '',
        confirmarSenha: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const firstName = user.name.split(" ")[0];
    const lastName = user.name.split(" ")[1];
    const navigation = useNavigation()
    const userName = `${firstName} ${lastName}`

    const handleChangeEmail = (text) => {

        useUpDatePasswordPassword({
            ...updatePassword,
            email: text
        })
    }

    const handleChangeSenha = (text) => {

        useUpDatePasswordPassword({
            ...updatePassword,
            senha: text
        })
    }

    const handleChangeSenhaConfirm = (text) => {

        useUpDatePasswordPassword({
            ...updatePassword,
            confirmarSenha: text
        })
    }

    const handleSend = async () => {
        const { email, senha, confirmarSenha } = updatePassword

        if (!email || email == "") { return Alert.alert("MyBank", "Dados preenchidos de forma inválida.") }
        if (email != user.email) { return Alert.alert("MyBank", "Email se difere do usuário logado.") }
        if (!senha || senha == "") { return Alert.alert("MyBank", "Data preenchida de forma inválida") }
        if (!confirmarSenha || confirmarSenha != senha) {
            Alert.alert("MyBank", "As senhas se diferem! ")
            return
        }
        else {
            await uptadeNewPassword(updatePassword)
            useUpDatePasswordPassword({
                email: '',
                senha: '',
                confirmarSenha: ''
            })
            navigation.goBack()
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={{ display: 'flex', marginTop: 55, height: 50, alignItems: 'center' }}>
                    <Avatar />
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>
            <Spacer size={2} />
            <Text style={{ fontSize: 18, textAlign: 'center' }}>Meus Dados:</Text>
            <Spacer size={2} />

            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>ID usuário </Text>
                <Text style={styles.infoData}>{user._id}</Text>
            </TouchableOpacity>
            <Spacer size={4} />
            <View>
                <Text style={{ marginLeft: 20, color: Colors.primary, fontWeight: 'bold', fontSize: 16, marginBottom: 6 }}>Confirme o e-mail: </Text>
                <TextInput
                    placeholderTextColor={Colors.lightGray}
                    placeholder='fulano@gmail.com'
                    name="email"
                    value={updatePassword.email}
                    autoCapitalize="none"
                    onChangeText={(text) => handleChangeEmail(text)}
                    style={{ width: '90%', height: 40, fontSize: 16, color: Colors.darkGray, textAlign: 'left', borderRadius: 3, marginLeft: '5%', borderWidth: 1, borderColor: Colors.primary, paddingLeft: 8 }}

                />
                <Spacer size={2} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 20, color: Colors.primary, fontWeight: 'bold', fontSize: 16, marginBottom: 6 }}>Nova senha: </Text>
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? 'eye-sharp' : 'eye-off-sharp'} size={20} color={Colors.lightGray} style={{ paddingLeft: 5, justifyContent: 'center', }} />
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholderTextColor={Colors.lightGray}
                    placeholder='******'
                    name="email"
                    secureTextEntry={!showPassword ? true : false}
                    value={updatePassword.senha}
                    autoCapitalize="none"
                    onChangeText={(text) => handleChangeSenha(text)}
                    style={{ width: '90%', height: 40, fontSize: 16, color: Colors.darkGray, textAlign: 'left', borderRadius: 3, marginLeft: '5%', borderWidth: 1, borderColor: Colors.primary, paddingLeft: 8 }}
                />
                <Spacer size={2} />
                <Text style={{ marginLeft: 20, color: Colors.primary, fontWeight: 'bold', fontSize: 16, marginBottom: 6 }}>Confirme a senha: </Text>
                <TextInput
                    placeholderTextColor={Colors.lightGray}
                    placeholder='******'
                    secureTextEntry={!showPassword ? true : false}
                    name="email"
                    value={updatePassword.confirmarSenha}
                    autoCapitalize="none"
                    onChangeText={(text) => handleChangeSenhaConfirm(text)}
                    style={{ width: '90%', height: 40, fontSize: 16, color: Colors.darkGray, textAlign: 'left', borderRadius: 3, marginLeft: '5%', borderWidth: 1, borderColor: Colors.primary, paddingLeft: 8 }}
                />
                <Spacer size={2} />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.buttonLogin} onPress={() => { handleSend() }}>
                        <Text style={{ color: '#B22222', fontSize: 17 }}>Alterar senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </View >
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
        padding: 15,
        justifyContent: 'space-between',

    },
    menuItemText: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    buttonLogin: {
        borderWidth: 1,
        borderColor: '#B22222',
        padding: 7,
        width: '50%',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10
    },

});