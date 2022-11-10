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
import { loginUser } from '../../../interface/auth-interface';
import { TextInputState } from '../../atoms/TextIput';


export const Signin = ({ navigation }) => {

  // const {loginUser} = useContext(AuthContext);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);

  // const val = useContext(AuthContext);


  const { setUser } = useContext(AuthContext)

  const [login, setLogin] = useState({
    email: Environment.auth.email,
    password: Environment.auth.password
  })

  const handleChange = (name, value) => {
    setLogin({
      ...login,
      [name]: value
    })
  }

  const handleLogin = async () => {
    try {

      const { email, password } = login
      console.log(login, 'login-screen')

      if (!email || email.length < 6 || email == "" || !email.includes('@')) {
        Alert.alert("MyBank", "email inválido. Verifique os dados e tente novamente!")
        return false
      }

      if (!password || password.length < 6 || password == "") {
        Alert.alert('MayBank', 'A senha deve conter no mínimo 6 digitos.')
        return false
      }

      const user = await loginUser(login)
      setUser(user)

      if (!user) {
        Alert.alert('MyBank', 'Usuário não encontrado ou senha incorreta. Verifique os dados e tente novamente!')
        return

      }


    } catch (error) {
      console.log(JSON.stringify(error), 'Ocorreu um erro ao logar')
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
            <Spacer size={1} />
            <TextInputState
              placeholder="  ✉️ e-mail, usuario"
              placeholderTextColor="#696969"
              name="email"
              keyboardType='email-address'
              autoCapitalize="none"
              value={login.email}
              handleChange={(name, value) => handleChange(name, value)}
            />

            <TextInputState
              secureTextEntry={true}
              type="password"
              placeholder=" 🔒 Digite sua senha"
              placeholderTextColor="#696969"
              name="password"
              autoCapitalize="none"
              value={login.password}
              handleChange={(name, value) => handleChange(name, value)}
            />

            <TouchableOpacity style={{ cursor: 'pointer', marginLeft: 140, color: "#fff", marginBottom: 10, fontSize: 14 }}>
              <Text style={{ color: "#fff" }}>Recuperar senha?</Text></TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonLogin} onPress={handleLogin}>

              <Text style={{ color: '#fff', fontSize: 17 }}>Entrar</Text>
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