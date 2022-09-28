import React from "react";
import { View } from "react-native";

export const Spacer = ({ size = 1, fullWidth = false }) => {
    return <View style={{ padding: 5 * size, flex: fullWidth ? 1 : 0}} />
}