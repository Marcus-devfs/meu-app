import { useContext, } from "react"
import { ActivityIndicator, View, StyleSheet, Text, Image, TouchableOpacity } from "react-native"
import { AppContext } from "../../context/validators/AppContext"
import { AuthContext } from "../../context/validators/AuthContext"
import Colors from "./Colors"
import { Ionicons } from "./icons"

export const Alert = () => {
    const { alertMessage, stopMessage } = useContext(AppContext)
    const { user } = useContext(AuthContext)

    if (!!alertMessage)
        return (
            <>
                <View style={styles.overlay} />
                <View style={styles.container}>
                    <TouchableOpacity style={{ marginLeft: '80%', top: 50, backgroundColor: 'red', borderRadius: 100 }}
                        onPress={() => { stopMessage() }}>
                        <Ionicons name="close" size={25} color={Colors.darkGray}></Ionicons>
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Image style={styles.imgLogin}
                            source={require('../../assets/icono.png')}
                            resizeMode="contain"
                        />

                    </View>
                    <View>
                        <View style={styles.boxMessage}>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, marginTop: 5, fontWeight: '500', color: Colors.darkGray }}>Olá </Text>
                                <Text style={{ fontSize: 16, marginTop: 5, fontWeight: '500', color: Colors.primary, fontWeight: 'bold' }}>{user.name}!</Text>
                            </View>
                            <Text style={{ fontSize: 16, marginTop: 10, fontWeight: '500', color: Colors.darkGray, textAlign: 'center' }}>Seja bem vindo ao MyBank, Seu aplicativo de controle financeiro!</Text>
                            <Text style={{ fontSize: 16, marginTop: 10, fontWeight: '500', colcolor: Colors.darkGray }}></Text>
                        </View>
                    </View>
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
        alignItems: 'center',
    },
    logoContainer: {
        width: 130,
        height: 130,
        borderRadius: 80,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    boxMessage: {
        width: '90%',
        marginTop: 30,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10
    }
})


