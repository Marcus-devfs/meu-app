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
import Environment from '../../../config/Environment';
import { AuthNavigator } from '../../layout/AuthNavigator';


// export function handleSubmit({navigation,email, senha}){

//   if(TextInput == user)
//   return(navigation.navigate("dashboard"));
//   else{
//     alert('email ou senha incorreta. Verifique e tente novamente.')
//   }

// }


export const Signin = ({ navigation }) => {

  const {loginUser} = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);



  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);

  // const val = useContext(AuthContext);

    const handleLogin = (isLoggedIn) => {


    let emailOk = "vini";
    let senhaOk = "111"

    if (email != emailOk) {
      return Alert.alert("MyBank", "email ou senha incorretos. Tente novamente!")
    }
    else if (password != senhaOk) {
      return Alert.alert("MyBank", "email ou senha incorretos. Tente novamente!")
    }
    return (
      setIsLoggedIn(!isLoggedIn)    
    );
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
            <Spacer size={1} />
            <TextInput
              style={styles.input} placeholder="  ✉️ e-mail, usuario" placeholderTextColor="#696969" onChangeText={(email) => setEmail(email)} value={email}
            />
            <TextInput
              style={styles.input} secureTextEntry={true} placeholder=" 🔒 Digite sua senha" placeholderTextColor="#696969" onChangeText={(password) => setPassword(password)} value={password}
            />
            <TouchableOpacity style={{ cursor: 'pointer', marginLeft: 140, color: "#fff", marginBottom: 10, fontSize: 14 }}><Text style={{ color: "#fff" }}>Recuperar senha?</Text></TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonLogin} onPress={() => 
                loginUser(email, password)
              // navigation.navigate('dashboard')
              }
            >
              <Text style={{ color: '#fff', fontSize: 17 }}>Entrar</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spacer size={2} />
            <Text style={{ color: '#fff', fontSize: 13 }}>Ainda não tem conta?</Text>
            <TouchableOpacity
              style={styles.buttonRegister} onPress={() => {
                navigation.navigate('Register-Screen')
              }}
            >
              <Text style={{ color: '#1E90FF', fontSize: 17 }}>Registre-se</Text>
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