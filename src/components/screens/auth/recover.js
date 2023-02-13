import { StatusBar } from 'expo-status-bar';
import React, { useState, } from 'react';
import {
    Text,
    Alert,
    View,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { Spacer, } from '../../atoms/Spacer';
import Colors from '../../atoms/Colors';
import { recover } from '../../../interface/auth-interface';
import { TextInputState } from '../../atoms/TextIput';
import { useNavigation } from '@react-navigation/native';



export const RecoverScreen = () => {

    const [email, setEmail] = useState('')
    const navigation = useNavigation()

    const handleChange = (name, value) => {
        setEmail({
            ...email,
            [name]: value
        })
    }

    const handleRecover = async () => {
        
        if (!email || email.length < 6 || email == "") {
            Alert.alert("MyBank", "email inválido. Verifique os dados e tente novamente!")
            return
        }
        else {
            await recover(email)
            navigation.goBack()
        }
    }


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <Spacer size={1} />
                    <View style={styles.containerForm}>
                        <Spacer size={3} />
                        <Image style={styles.imgLogin}
                            source={require('../../../assets/icono.png')}
                            resizeMode="contain"
                        />
                        <Spacer size={3} />
                        <TextInputState
                            placeholder="  ✉️ e-mail, usuario"
                            placeholderTextColor="#696969"
                            name="email"
                            keyboardType='email-address'
                            autoCapitalize="none"
                            value={email}
                            handleChange={(name, value) => handleChange(name, value)}
                        />

                        <TouchableOpacity
                            style={styles.buttonLogin} onPress={handleRecover}>

                            <Text style={{ color: '#fff', fontSize: 17 }}>Recuperar Senha</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <Spacer size={2} />
                        <Text style={{ color: '#fff', fontSize: 13 }}>Ainda não tem conta?</Text>
                        <TouchableOpacity
                            style={styles.buttonRegister} onPress={() => {
                                navigation.navigate('Register-Screen')
                            }}
                        >
                            <Text style={{ color: '#1E90FF', fontSize: 14 }}> Registre-se</Text>
                        </TouchableOpacity>
                    </View>
                    <StatusBar style="auto" />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.primary,
    },
    containerForm: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        borderRadius: 10,
        maxHeight: 400,
        margin: 40,
        marginTop: 100
    },
    imgLogin: {
        width: '100%',
        height: "35%",
        resizeMode: 'contain',
        marginBottom: 30,
        marginTop: 10
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 5,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 8,

    },
    buttonLogin: {
        backgroundColor: '#B22222',
        padding: 7,
        width: '90%',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },
});