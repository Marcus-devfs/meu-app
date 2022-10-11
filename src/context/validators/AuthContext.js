import React, { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null)

    const loggin = () =>{
        setUserToken('@MyBank');
        setIsLoading(false);
    }

    const logOut = ()=>{
        setUserToken(null);
        setIsLoading(false)
    }



    <AuthContext.Provider value={{loggin, logOut, isLoading, userToken}}>
        {children}
    </AuthContext.Provider>
}