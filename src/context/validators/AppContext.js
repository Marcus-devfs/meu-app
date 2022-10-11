import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthContext";
import { AuthProvider } from "./AuthContext";
import { ActivityIndicator, View } from "react-native";
import AuthNavigator from "../../components/layout/AuthNavigator";
import LoggedInStacks from "../../components/layout/Stacks";
import { AuthProvider } from "./AuthContext";

 function AppContext(){

    const { auth } = useContext(AuthContext);
    return(
            auth ? <AuthNavigator /> : <LoggedInStacks />
    )
}

export default AppContext