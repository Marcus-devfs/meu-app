import api from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { beforeLogin, beforeCreateAccount, beforeUserDataUpdate, } from "../context/validators/auth-validators";

// Ok - trocar no Signin o email e password por ..login
export const loginUser = async (loginData) => {
    try {

        const isValid = await beforeLogin(loginData)
        if (!isValid) return false

        const response = await api.post("/auth/login", loginData)

        const { user, token } = response.data

        if (token) AsyncStorage.setItem('@MyBank', token)

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        return user
    } catch (error) {
        console.log(error, 'Usuario não encontrado');
        Alert.alert('MyBank', 'Usuario não encontrado! 😞 ')
        return false
    }
}

//Verificar
export const doLoginByToken = async (token) => {
    try {

        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        const response = await api.post('/login/token')

        const { user, token: newToken } = response.data

        if (newToken) AsyncStorage.setItem('@1trainer', newToken)

        api.defaults.headers['Authorization'] = `Bearer ${newToken}`;

        return user
    } catch (error) {
        throwError(error)
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

// Ok - trocar no Register o email,password, confirm, etc por ..userDate
export const createUser = async (userData) => {
    try {
        beforeCreateAccount(userData)
        const response = await api.post("/auth/register", { user: userData })
        return response.data
    } catch (error) {
        console.log(error, 'Ocorreu um erro ao cadastrar seu usuario');
        Alert.alert('MyBank', 'Ocorreu um erro ao cadastrar seu usuario! Verifique as informações e tente novamente 😞 ')
    }
}

// Verificar
export const userDataUpdate = async (userData) => {
    try {
        beforeUserDataUpdate(userData)
        const response = await api.patch(`/user/${userData._id}`, { user: userData })
        const { data } = response
        const { user: updatedUser } = data

        return updatedUser
    } catch (error) {
        console.log(error)
        return false
    }
}