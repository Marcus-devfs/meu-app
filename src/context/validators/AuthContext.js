import React, { createContext } from "react";
import axios from 'axios'
import { API_URL } from "../../config/Environment";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const register = (name, email, password, confirmpassword) => {

        axios
            .post(`${API_URL}/auth/register`, {
                name,
                email,
                password,
                confirmpassword,
            })
            .then(res => {
                let userInfo = res.data;
                console.log(userInfo)
            })
            .catch(e => {
                console.log(`erro ao cadastrar ${e}!`);
            })

        //validation

    }



    return (
        <AuthContext.Provider value={register}>{children}</AuthContext.Provider>
    );
}