import api from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { beforeLogin, beforeCreateAccount, beforeUserDataUpdate, } from "../context/validators/auth-validators";
import { useNavigation } from "@react-navigation/native";

export const loginUser = async (login) => {
    try {
        const isValid = await beforeLogin(login)
        if (!isValid) return false

        const response = await api.post("/auth/login", login)

        const { user, token } = response.data

        if (token) AsyncStorage.setItem('@MyBank', token)

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        return user
    } catch (error) {
       Alert.alert('MyBank', 'Usuario não encontrado');
        return false
    }

}
//Ok
export const doLoginByToken = async (token) => {
    try {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        const response = await api.post('/login/token')

        const { user, token: newToken } = response.data

        if (newToken) AsyncStorage.setItem('@1trainer', newToken)
        
        api.defaults.headers['Authorization'] = `Bearer ${newToken}`;
        return user
    } catch (error) {
        console.log(error.data, 'Invalid credentials')
        return false
    }
}
// Ok
export const doLogout = async (user) => {
    try {
        AsyncStorage.removeItem('@MyBank')
        api.defaults.headers['Authorization'] = ``;
        return user
    } catch (error) {
        console.log(error)
    }
}
// Verificar depois - "Esqueci a senha"

// export const passRecover = async (email) => {
//     try {
//         const isValid = await beforeForgot(email)
//         if (!isValid) return false

//         const response = await api.post('/login/recover', { email })
//         const { success } = response.data
//         return success
//     } catch (error) {
//         throwError(error)
//     }
// }

// Ok - trocar no Register o email,password, confirm, etc por ..userDate
export const createUser = async (userData) => {

    try {
        const response = await api.post("/auth/register", userData)
        Alert.alert('MyBank', 'Usuario cadastrado com sucesso!')
        return response.data
    } catch (error) {
        Alert.alert('MyBank', 'Ocorreu um erro. Verifique se os dados estão corretos')
        console.log(error.data, 'Ocorreu um erro ao cadastrar seu usuario');
    }
}
