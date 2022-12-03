import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import api from "../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { doLogout } from "../../interface/auth-interface";
import { AppContext } from "./AppContext";



export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null)
    console.log(user, 'authcontext aqui')

    useEffect(() => {
        const LoginByToken = async() => {
            const token = await AsyncStorage.getItem('@1trainer')
            console.log('token =', token)

            if (token) {
                // const user = await doLoginByToken(token)
                setUser(user)
            }
        }
        LoginByToken()
    }, [])


    const { startLoading, stopLoading, loading } = useContext(AppContext)

    const handleLogout = async () => {
        startLoading({ msg: 'Carregando...' })
        await setUser(null)
        stopLoading()
    }


    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            handleLogout
        }}
        >{children}

        </AuthContext.Provider>

    );

}




