import React from "react";
import { createContext } from "react";

interface AuthData{
    token:String;
    email:String;
    name:String;
}

interface AuthContextData{
    authData: AuthData;
    SignIn: (email: string, password: string) => Promise<AuthData>;
    SignOut:() => Promise<void>;

    export const AuthContext = createContext <AuthContextData>(
        {} as AuthContextData,
    );
}