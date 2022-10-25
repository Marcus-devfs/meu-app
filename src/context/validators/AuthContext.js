import React, { createContext } from "react";
import axios from 'axios'
import api from "../../config/api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const createUser = async (name, email, password, confirmpassword) => {

        try {
            await api.post("/auth/register", {
                name: name,
                email: email,
                password: password,
                confirmpassword: confirmpassword
            });
            console.log(createUser,'usuario Registrado')
            console.log('name:', name)
            console.log('email:', email)
            console.log('password:', password)
            console.log('confirmpassword:', confirmpassword)


        } catch (err) {
            console.log(err, 'Usuario não encontrado');
        }


        // axios
        //     .post(`${API_URL}/auth/register`, {
        //         name,
        //         email,
        //         password,
        //     })
        //     .then(res => {
        //         let userInfo = res.data;
        //         console.log(userInfo)
        //     })
        //     .catch(e => {
        //         console.log(`erro ao cadastrar ${e}!`);
        //     });

    }

    const loginUser = async (email, password) => {

        try {
            await api.post("/auth/login", {
                email: email,
                password: password,
            });
            
            console.log('email:', email, 'senha:', password,)
            console.log(loginUser,'usuario logado')

        } catch (err) {
            console.log(err, 'Usuario não encontrado');
        }
    }

    //validation

    return (
        <AuthContext.Provider value={{
            createUser,
            loginUser
        }}
        >{children}

        </AuthContext.Provider>

    );

}




