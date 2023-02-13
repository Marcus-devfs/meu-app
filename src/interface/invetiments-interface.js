import { Alert } from "react-native";
import api from "../config/api";

export const createInvestiment = async (investiment) => {
    try {
        const response = api.post('/investmentList/create', investiment)
        const { msg } = (await response).data
        Alert.alert('MyBank', msg)

        return;
    } catch (error) {
        console.log('erro de dados', error.data)
    }
}