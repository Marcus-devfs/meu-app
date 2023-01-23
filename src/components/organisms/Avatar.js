import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, StyleSheet, Text, Image, borderRadius, TouchableOpacity } from 'react-native';
import { AuthContext } from "../../context/validators/AuthContext";
import Colors from "../atoms/Colors";
import { FontAwesome5, Ionicons } from "../atoms/icons";
import { MaterialCommunityIcons } from "../atoms/icons";

const firstName = "Marcus"
const imageAvatar = require('../../assets/perfil/perfil.jpg')
export const email = "marcusvini6277@gmail.com";

export default function Avatar() {

    const { user } = useContext(AuthContext)
    const { name, email } = user

    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.containerAvatar} onPress={() => navigation.navigate('myData')}>
            <FontAwesome5 name="user" size={32} color={'#fff'}></FontAwesome5>
            {/* <Image style={styles.avatarImg}

                source={imageAvatar}
                resizeMode="cover"
            /> */}
        </TouchableOpacity>
    )

}



const styles = StyleSheet.create({
    containerAvatar: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    avatarImg: {
        width: 60,
        height: 60,
        borderRadius: 100,
        marginLeft: 10,
    },

    // Avatar: {
    //     fontSize: 40,
    //     justifyContent: 'center',
    // },

})