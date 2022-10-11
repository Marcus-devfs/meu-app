import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthContext";
import { AuthProvider } from "./AuthContext";
import { ActivityIndicator, View } from "react-native";
import AppStacks from "../../components/layout/Stacks";
import AuthNavigator from "../../components/layout/AuthNavigator";

export default function AppContext(){

    const {isLoadding, userToken} = useContext(AuthContext);

    if( isLoadding) {
        return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'red'}}>
            <ActivityIndicator size={'large'}/>
        </View>
        );
    }

    return(
        <NavigationContainer>
            {userToken !== null ? <AppStacks /> : <AuthNavigator />}
            <AuthNavigator />
        </NavigationContainer>
    )
}