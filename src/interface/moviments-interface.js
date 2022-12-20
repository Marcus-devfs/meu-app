import api from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const createMovimentSpend = async (spend) => {
    try {

        const response = api.post('/moviment/create', spend)
        const { msg } = (await response).data
        Alert.alert('MyBank', msg)

        return;
    } catch (error) {
        console.log('erro de dados', error.data)
    }
}

export const createMovimentDeposit = async (deposit) => {
    try {

        const response = api.post('/moviment/create', deposit)
        const { msg } = (await response).data

        Alert.alert('MyBank', msg)

        return;
    } catch (error) {
        console.log(error.data)
    }
}