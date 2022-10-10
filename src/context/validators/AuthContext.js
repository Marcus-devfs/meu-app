import React, { createContext, useState } from 'react'
import { doLogout } from '../../interface/auth/auth-interface';


export const AuthContext = createContext({});

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)

   

    return (
        <AuthContext.Provider value={{ user, setUser, doLogout }}>
            {children}
        </AuthContext.Provider>
    )
};