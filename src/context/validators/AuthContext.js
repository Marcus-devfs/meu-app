import React, { useState, useEffect } from "react";
import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [userToken, setUserToken] = useState(null);

    // const loggin = () => {
    //     setIsLoading(true)
    //     setUserToken('@MyBank');
    //     setIsLoading(false);
    //     AsyncStorage.setItem('userToken', '@MyBank');
    //     setIsLoading(false);
    // }

    // const logOut = () => {
    //     setIsLoading(true);
    //     setUserToken(null);
    //     AsyncStorage.removeItem('userToken')
    //     setIsLoading(false)
    // }

    // const isLoggedIn = async() => {
    //     try {
    //         setIsLoading(true);
    //         let userToken = await AsyncStorage.getItem('userToken');
    //         setUserToken(userToken);
    //         setIsLoading(false);
    //     }
    //     catch (e) {
    //         console.log('Error ao logar ${e}');
    //     }
    // }

    // useEffect(()=>{
    //     isLoggedIn();
    // }, []);




    <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext