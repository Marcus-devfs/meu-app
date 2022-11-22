import api from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { beforeLogin, beforeCreateAccount, beforeUserDataUpdate, } from "../context/validators/auth-validators";

// Ok - trocar no Signin o email e password por ..login
export const loginUser = async (login) => {
    try {

        const isValid = await beforeLogin(login)
        if (!isValid) return false

        const response = await api.post("/auth/login", login)

        const { user, token } = response.data

        if (token) AsyncStorage.setItem('@MyBank', token)
        console.log('token aqui', token)
        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        return user
    } catch (error) {
        console.log(error, 'Usuario não encontrado');
        return false
    }
    
}

//Ok
export const doLoginByToken = async (token) => {
    try {

        api.defaults.headers['authorization'] = `Bearer ${token}`;
        const response = await api.get('/')

        const { user, token: newToken } = response.data

        if (newToken) AsyncStorage.setItem('@1trainer', newToken)

        api.defaults.headers['Authorization'] = `Bearer ${newToken}`;

        console.log(user, 'doLoginByToken aqui')
        return user
    } catch (error) {
        console.error(error.response.data, 'Invalid credentials')
        return false
    }
}

// Ok
export const doLogout = async () => {
    try {
        AsyncStorage.removeItem('@MyBank')
        api.defaults.headers['Authorization'] = ``;

        return
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

//

// Ok - trocar no Register o email,password, confirm, etc por ..userDate
export const createUser = async (userData) => {
    console.log(userData, 'auth')

    try {
        // await beforeCreateAccount(userData)
        const response = await api.post("/auth/register", userData)
        Alert.alert('MyBank','Usuario cadastrado com sucesso!')
        return response.data
    } catch (error) {
        console.log(error.data, 'Ocorreu um erro ao cadastrar seu usuario');
    }
}

// Ok
// export const userDataUpdate = async (userData) => {
//     console.log(userData)
//     try {
//         beforeUserDataUpdate(userData)
//         const response = await api.patch(`/user/${userData._id}`, { user: userData })
//         const { data } = response
//         const { user: updatedUser } = data

//         return updatedUser
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// }