import React, { useContext } from "react";
import { View, StyleSheet, Text, Image, borderRadius } from 'react-native';
import { AuthContext } from "../../context/validators/AuthContext";
import Colors from "../atoms/Colors";
import { Ionicons } from "../atoms/icons";
import { MaterialCommunityIcons } from "../atoms/icons";

const firstName = "Marcus"
const imageAvatar = require('../../assets/perfil/perfil.jpg')
export const email = "marcusvini6277@gmail.com";

export default function Avatar() {

    const { user } = useContext(AuthContext)
    const { name, email } = user

    return (
        <View style={styles.containerAvatar}>
            <Image style={styles.avatarImg}
                source={imageAvatar}
                resizeMode="cover"
            />
        </View>
    )

}



const styles = StyleSheet.create({
    containerAvatar: {
        alignItems: 'center',
        justifyContent: 'center'
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