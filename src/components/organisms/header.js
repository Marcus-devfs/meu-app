import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from "../atoms/icons";
import { MaterialCommunityIcons } from "../atoms/icons";
import Avatar from "./Avatar";
import { Spacer } from "../atoms/Spacer";
import Colors from "../atoms/Colors";


export const name = "Marcus Silva";

export default function Header() {
    return (
        <View style={styles.container}>
            <View>
                <Spacer size={3} />
                <Avatar />
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        width: '100%',
    },


})