import React, { createContext } from "react";
import axios from 'axios'
import api from "../../config/api";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const createUser = async (name, email, password, confirmpassword) => {

        try {
            await api.post("/auth/register", {
                name: name,
                email: email,
                password: password,
                confirmpassword: confirmpassword
            });
            Alert.alert('MyBank', 'Cadastrado com Sucesso! 😎')
            console.log('name:', name)
            console.log('email:', email)
            console.log('password:', password)
            console.log('confirmpassword:', confirmpassword)

        } catch (err) {
            console.log(err, 'Ocorreu um erro ao cadastrar seu usuario');
            Alert.alert('MyBank', 'Ocorreu um erro ao cadastrar seu usuario! Verifique as informações e tente novamente 😞 ')

        }
    }

    const loginUser = async (email, password) => {

        try {
            const data = await api.post("/auth/login", {
                email: email,
                password: password,
            });
            
            await AsyncStorage.setItem('@MyBank', data.data.token);

            const id = await AsyncStorage.getItem('@MyBank')
            console.log(id)

        } catch (err) {
            console.log(err, 'Usuario não encontrado');
            Alert.alert('MyBank', 'Usuario não encontrado! 😞 ')
        }
    }

    //validation

    return (
        <AuthContext.Provider value={{
            createUser,
            loginUser
        }}
        >{children}

        </AuthContext.Provider>

    );

}




