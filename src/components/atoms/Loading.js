import { useContext, } from "react"
import { ActivityIndicator, View, StyleSheet, Text } from "react-native"
import { AppContext } from "../../context/validators/AppContext"
import Colors from "./Colors"

export const Loading = () => {
    const { loading } = useContext(AppContext)
    console.log(loading)
  

    if (!!loading)
        return (
            <>
                <View style={styles.overlay} />
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                    <Text style={{ fontSize: 16, marginTop: 10, fontWeight: '500', color: '#fff' }}>{loading.msg}</Text>
                </View>
            </>
        )

    return (<></>)

}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: .7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
})


