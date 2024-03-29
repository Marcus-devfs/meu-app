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

export const doLogout = async (user) => {
    try {
        AsyncStorage.removeItem('@MyBank')
        api.defaults.headers['Authorization'] = ``;
        return user
    } catch (error) {
        console.log(error)
    }
}

export const update = async (updateData) => {
    try {
        const response = await api.post('/login/updateData', { updateData })
        const { msg } = response.data
        Alert.alert('MyBank', `${msg}`)
        return msg
    } catch (error) {
        console.log(error)
    }
}

export const uptadeNewPassword = async (updatePassword) => {
    try {
        const response = await api.post('/login/updatePass', { updatePassword })
        const { newPassword } = response.data
        Alert.alert('MyBank', `Senha alterada com sucesso. Nova senha é: ${newPassword}`)
        return newPassword
    } catch (error) {
        console.log(error)
    }
}

export const createUser = async (userData) => {

    try {
        const response = await api.post("/auth/register", userData)
        const { msg } = response.data
        Alert.alert('MyBank', `${msg}`)
        const { user } = response.data
        return user
    } catch (error) {
        Alert.alert('MyBank', 'Usuário existente. Verifique os dados.')
        console.log(error.data, 'Ocorreu um erro ao cadastrar seu usuario');
    }
}

export const recover = async (email) => {
    try {
        const response = await api.post('/login/recover', email)
        const { data } = response
        Alert.alert('MyBank', `A nova senha foi enviada para o seu email`)
        return data
    } catch (error) {
        Alert.alert('MyBank', `A nova senha foi enviada para o seu email`)
        console.log(error)
    }
}
