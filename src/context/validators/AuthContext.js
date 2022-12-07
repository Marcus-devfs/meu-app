import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import api from "../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { doLogout } from "../../interface/auth-interface";
import { AppContext } from "./AppContext";



export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(null);
    const [user, setUser] = useState(null)
    console.log(user, 'authcontext aqui')

    useEffect(() => {
        const LoginByToken = async () => {
            const authToken = await AsyncStorage.getItem('@1trainer')
            console.log('token =', authToken)
            if (authToken) {
                setAuth(authToken)
            }else{
                setAuth(null)
            }
        }
        LoginByToken()
    },[])


    const { startLoading, stopLoading, loading } = useContext(AppContext)

    const handleLogout = async () => {
        startLoading({ msg: 'Carregando...' })
        await AsyncStorage.removeItem('@MyBank')
        setAuth(null)
        setUser(null)
        stopLoading()
    }


    return (
        <AuthContext.Provider value={{
            user,
            auth,
            setAuth,
            setUser,
            handleLogout
        }}
        >{children}

        </AuthContext.Provider>

    );

}




