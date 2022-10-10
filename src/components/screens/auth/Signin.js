import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Text,
  Alert,
  View,
  StyleSheet,
  TextInput,
  TextInputField,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Spacer, } from '../../atoms/Spacer';
import Colors from '../../atoms/Colors';
import { doLogin } from '../../../interface/auth/auth-interface';
import Environment from '../../../config/Environment';
import { useContext } from 'react';
import  AuthContext  from '../../../context/validators/AuthContext';


// export function handleSubmit({navigation,email, senha}){

//   if(TextInput == user)
//   return(navigation.navigate("dashboard"));
//   else{
//     alert('email ou senha incorreta. Verifique e tente novamente.')
//   }

// }


export const Signin = ({ navigation }) => {

  const { setUser } = useContext(AuthContext)

  const [login, setLogin] = useState({
    email: Environment.auth.email,
    password: Environment.auth.password
  })

  const [rememberLogin, setRemeberLogin] = useState(false)

  const handleChange = (name, value) => {
    setLogin({
      ...login,
      [name]: value
    })
  }


  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    try {
      // let emailOk = "vini";
      // let senhaOk = "111"

      const { email, password } = login

      if (!email || email == '' || email.length < 6 || !email.includes('@')) {
        Alert.alert("MyBank", "Insira um email válido!")
        return false
      }

      const user = await doLogin(login)

      if (!user) {
        Alert.alert('MyBank', 'Usuario não encontrado ou senha incorreta. Verifique os dados e tente novamente')
        return
      }

      setUser(user)
    }
    catch (error) {
      console.log(error)
    }
    // if (!password || password == '' || password.length < 6) {
    //   Alert.alert("MyBank", "A senha deve conter no mínimo 6 caracteres")
    //   return false
    // }
    // else {
    //   return (navigation.navigate("dashboard"));
    // }
  }


  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <Spacer size={1} />
          <View style={styles.containerForm}>
            <Spacer size={5} />
            <Image style={styles.imgLogin}
              source={require('../../../assets/icono.png')}
              resizeMode="contain"
            />
            <Spacer size={1} />
            <TextInputField
              style={styles.input}
              name="email"
              placeholder="  ✉️ e-mail, usuario"
              handleChange={(name, value) => handleChange(name, value)}
              keyBoardType="email-address"
              placeholderTextColor="#696969"
              value={login.email}
              textContentType="username"
              autoComplete="email"
            />
            <TextInputField
              style={styles.input}
              name="password"
              hideText={true}
              handleChange={(name, value) => handleChange(name, value)}
              value={login.password}
              textContentType="password"
              secureTextEntry={true}
              placeholder=" 🔒 Digite sua senha"
              placeholderTextColor="#696969"
              type='password'
            />
            <TouchableOpacity style={{ cursor: 'pointer', marginLeft: 140, color: "#fff", marginBottom: 10, fontSize: 14 }}><Text style={{ color: "#fff" }}>Recuperar senha?</Text></TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonLogin} onPress={handleLogin}
            >
              <Text style={{ color: '#fff', fontSize: 17 }}>Entrar</Text>
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
  buttonLogin: {
    backgroundColor: '#B22222',
    padding: 7,
    width: '90%',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10
  },

});