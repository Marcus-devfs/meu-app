import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { TextInputState } from '../../atoms/TextIput';
import {
    Text,
    Alert,
    View,
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { Spacer, } from '../../atoms/Spacer';
import Colors from '../../atoms/Colors';
import { AuthContext } from '../../../context/validators/AuthContext';
import { createUser } from '../../../interface/auth-interface';
import { createCategoriesDefault } from '../../../interface/category-interface';

export const RegisterScreen = ({ navigation }) => {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: '',
        dateBirth: '',
        telephone: '',
    })

    const handleChange = async (name, value) => {
        if (name == 'telephone') {
            const regex = /^\(?([0-9]{2})\)?([0-9]{4,5})\-?([0-9]{4})$/mg;
            let str = value.replace(/[^0-9]/g, "").slice(0, 11);
            value = str.replace(regex, "($1)$2-$3")
        }
        if (name == 'dateBirth') {
            if (value.length == 2 || value.length == 5) {
                value = value + '/'
            }
        }
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleCreateAccount = async () => {

        const emailValidator = (email) => {
            const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&*'+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return EMAIL_REGEX.test(email)
        }

        const { name, email, password, confirmpassword, dateBirth, telephone } = userData

        if (!name) { Alert.alert('MyBank', "O campo 'Nome' é obrigatório") }
        if (!email) { Alert.alert('MyBank', "O campo 'E-mail' é obrigatório") }
        if (!emailValidator(email)) { Alert.alert('MyBank', "O e-mail digitado está incorreto") }
        if (!password) { Alert.alert('MyBank', "O campo 'Senha' é obrigatório") }
        if (password?.length < 6 || confirmpassword?.length < 6) { Alert.alert('MayBank', 'A senha deve conter no mínimo 6 digitos.') }
        if (password !== confirmpassword) { Alert.alert('MyBank', 'As senhas não conferem! Verifique e tente novamente') }
        if (!dateBirth) { Alert.alert('MyBank', "O campo data de nascimento é obrigatório") }
        if (!telephone || telephone?.length < 14 || telephone?.length > 15) { Alert.alert('MyBank', "O numero de telefone é invalido") }
        else {
            const create = await createUser(userData)
            if (create) {
                const idCategory = create?._id
                if (idCategory) {
                    await createCategoriesDefault(idCategory)
                    setUserData('')
                    navigation.navigate('Signin')
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%' }}>
                <ScrollView>
                    <View style={styles.containerForm}>
                        <Text style={{ color: '#fff', fontSize: 25, textAlign: 'center', width: '90%' }}>Crie sua conta!</Text>
                        <Spacer size={1} />
                        <Image style={styles.imgLogin} source={require('../../../assets/icono.png')} resizeMode="contain" />
                        <Spacer size={1} />
                        <View style={{ width: '95%', marginLeft: '4.5%' }}>

                            <Text style={styles.label}>Nome: </Text>
                            <TextInputState
                                name="name"
                                placeholder="João Silva"
                                placeholderTextColor="#696969"
                                value={userData.name}
                                handleChange={(name, value) => handleChange(name, value)}
                            />
                            <Text style={styles.label}>E-mail: </Text>

                            <TextInputState
                                name="email"
                                keyboardType='email-address'
                                placeholderTextColor="#696969"
                                placeholder="fulano@gmail.com"
                                autoCapitalize="none"
                                value={userData.email}
                                handleChange={(name, value) => handleChange(name, value)}
                            />
                            <Text style={styles.label}>Senha: </Text>

                            <TextInputState
                                name="password"
                                placeholder="******"
                                placeholderTextColor="#696969"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                value={userData.password}
                                handleChange={(name, value) => handleChange(name, value)}
                                type='password'
                            />
                            <Text style={styles.label}>Confime sua senha: </Text>

                            <TextInputState
                                name="confirmpassword"
                                placeholder="******"
                                placeholderTextColor="#696969"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                value={userData.confirmpassword}
                                handleChange={(name, value) => handleChange(name, value)}
                                type='password'
                            />

                            <Text style={styles.label}>Data de nascimento: </Text>

                            <TextInputState
                                name="dateBirth"
                                placeholder="20/02/1995"
                                placeholderTextColor="#696969"
                                value={userData.dateBirth}
                                handleChange={(name, value) => handleChange(name, value)}
                            />

                            <Text style={styles.label}>Telefone: </Text>

                            <TextInputState
                                name="telephone"
                                placeholder="(11) 91158-5464"
                                placeholderTextColor="#696969"
                                value={userData.telephone}
                                handleChange={(name, value) => handleChange(name, value)}
                            />
                        </View>
                        {/* <TouchableOpacity style={{cursor: 'pointer' ,marginLeft: 140, color: "#fff", marginBottom: 10, fontSize: 14 }}><Text style={{color: "#fff"}}>Recuperar senha?</Text></TouchableOpacity> */}
                        <Spacer size={1} />

                        <TouchableOpacity
                            style={styles.buttonRegister} onPress={() => {
                                handleCreateAccount()
                            }}>

                            <Text style={{ color: '#fff', fontSize: 17 }}>Cadastrar</Text>
                        </TouchableOpacity>

                        <Spacer size={5} />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <Spacer size={2} />
                        <Text style={{ color: '#fff', fontSize: 13 }}>Já possui uma conta?</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Signin')
                            }}
                        >
                            <Text style={{ color: '#1E90FF', fontSize: 14 }}> Fazer login</Text>
                        </TouchableOpacity>
                    </View>
                    <StatusBar barStyle={{ color: '#fff' }} />
                    <Spacer size={5} />
                </ScrollView>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    containerForm: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        width: '100%',
        borderRadius: 10,
        marginTop: 80,
        marginLeft: '5%'
    },
    imgLogin: {
        width: '90%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 30,
        marginTop: 10,
    },
    buttonRegister: {
        backgroundColor: '#B22222',
        padding: 7,
        width: '50%',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: '22%'
    },
    label: {
        textAlign: 'left',
        color: '#fff',
        marginLeft: 5,
        bottom: 5,
        fontSize: 15,
        marginTop: 5
    }

});