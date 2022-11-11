import { useContext,  } from "react"
import { ActivityIndicator, View, StyleSheet } from "react-native"
import { AppContext } from "../../context/validators/AppContext"
import Colors from "./Colors"

export const Loading = () => {
    const { loading } = useContext(AppContext)

    if (loading) {
        return (
            <>
                <View style={styles.container}>
                    <ActivityIndicator color={"#fff"} size={50} />
                </View>
            </>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.primary,
        justifyContent: 'center'
    },
})


