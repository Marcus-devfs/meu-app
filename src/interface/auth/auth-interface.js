import api from '../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { beforeLogin, beforeForgot, beforeCreateAccount, beforeUserDataUpdate } from '../validators/auth-validators'
// import { beforeLogin, beforeForgot, beforeCreateAccount, beforeUserDataUpdate } from "../validators/auth-validator";


export const doLogin = async (loginData) => {
   try {

      const isValid = await beforeLogin(loginData)
      if (!isValid) return false

      const response = await api.post('/login', loginData)

      const { user, token } = response.data

      if (token) AsyncStorage.setItem('@MyBank', token)

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      return user
   } catch (error) {
      console.log(error)
      return false
   }
}

export const doLoginByToken = async (token) => {
   try {

      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      const response = await api.post('/login/token')

      const { user, token: newToken } = response.data

      if (newToken) AsyncStorage.setItem('@MyBank', newToken)

      api.defaults.headers['Authorization'] = `Bearer ${newToken}`;

      return user
   } catch (error) {
      console.log(error)
      return false
   }
}

export const doLogout = async () => {
   try {
      AsyncStorage.removeItem('@MyBank')
      api.defaults.headers['Authorization'] = ``;

      return
   } catch (error) {
      console.log(error)
   }
}

export const passRecover = async (email) => {
   try {
      const isValid = await beforeForgot(email)
      if (!isValid) return false

      const response = await api.post('/login/recover', { email })
      const { success } = response.data
      return success
   } catch (error) {
      console.log(error)
   }
}

export const createAccount = async (userData) => {
   try {
      beforeCreateAccount(userData)
      const response = await api.post('/user', { user: userData })
      return response.data
   } catch (error) {
      console.log(error)
   }
}

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