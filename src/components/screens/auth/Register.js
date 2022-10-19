import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
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

// export function handleSubmit({navigation,email, senha}){

//   if(TextInput == user)
//   return(navigation.navigate("dashboard"));
//   else{
//     alert('email ou senha incorreta. Verifique e tente novamente.')
//   }

// }


export const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();

    const { register } = useContext(AuthContext);
    console.log(register)

    // const handleRegister = () => {

    //     // let emailOk = "vini";
    //     // let senhaOk = "111"

    //     // if (email != emailOk) {
    //     //   return Alert.alert("MyBank","email ou senha incorretos. Tente novamente!")
    //     // }
    //     // else if(password != senhaOk){
    //     //   return Alert.alert("MyBank","email ou senha incorretos. Tente novamente!")
    //     // }
    //     // else {
    //     //   return (navigation.navigate("dashboard"));
    //     // }
    // }


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <Spacer size={2} />
                    {/* <Text style={{ color: 'black', fontSize: 25 }}>{vailogo}</Text> */}
                    <View style={styles.containerForm}>
                        <Text style={{ color: '#fff', fontSize: 25 }}>Crie sua conta!</Text>
                        <Spacer size={5} />
                        <Image style={styles.imgLogin}
                            source={require('../../../assets/icono.png')}
                            resizeMode="contain"
                        />
                        <Spacer size={1} />
                        <TextInput
                            style={styles.input} placeholder=" Nome" placeholderTextColor="#696969" onChangeText={text => setName(text)} value={name}
                        />
                        <TextInput
                            style={styles.input} placeholder=" E-mail" placeholderTextColor="#696969" onChangeText={text => setEmail(text)} value={email}
                        />
                        <TextInput
                            style={styles.input} secureTextEntry={true} placeholder=" Senha" placeholderTextColor="#696969" onChangeText={text => setPassword(text)} value={password}
                        />
                        <TextInput
                            style={styles.input} secureTextEntry={true} placeholder=" Confirme sua Senha" placeholderTextColor="#696969" onChangeText={text => setConfirmPassword(text)} value={confirmpassword}
                        />
                        {/* <TouchableOpacity style={{cursor: 'pointer' ,marginLeft: 140, color: "#fff", marginBottom: 10, fontSize: 14 }}><Text style={{color: "#fff"}}>Recuperar senha?</Text></TouchableOpacity> */}
                        <Spacer size={1} />

                        <TouchableOpacity
                            style={styles.buttonRegister} onPress={() => {
                                register(name, email, password, confirmpassword);
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 17 }}>Cadastrar</Text>
                        </TouchableOpacity>
                        <Spacer size={5} />
                    </View>
                    <StatusBar barStyle={{ color: '#fff' }} />
                    

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.primary
    },
    containerForm: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        borderRadius: 10,
        height: 500,
        margin: 40,
        marginTop: 80,

    },
    imgLogin: {
        width: '100%',
        height: "30%",
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
    buttonRegister: {
        backgroundColor: '#B22222',
        padding: 7,
        width: '90%',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },

});