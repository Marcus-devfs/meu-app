import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Divider } from '../../atoms/Divider';
import Header, { name } from '../../organisms/header'
import { Ionicons } from '../../atoms/icons';
import { Spacer } from '../../atoms/Spacer';
import Colors from '../../atoms/Colors';
import { AuthContext } from '../../../context/validators/AuthContext';
import Avatar from '../../organisms/Avatar';
import { updataData, update, uptadeNewPassword } from '../../../interface/auth-interface';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../../../context/validadores';

export default function ChangeData() {

    const { user } = useContext(AuthContext)
    const [updateData, setUpdateData] = useState({
        email: user.email,
        telephoneNumber: user.telephone,
        dateBirthDay: formatDate({ date: user.dateBirth })
    })
    const firstName = user.name.split(" ")[0];
    const lastName = user.name.split(" ")[1];
    const navigation = useNavigation()
    const userName = `${firstName} ${lastName}`

    const handleChangeTel = (text) => {
        const regex = /^\(?([0-9]{2})\)?([0-9]{5})\-?([0-9]{4})$/mg;
        let str = text.replace(/[^0-9]/g, "").slice(0, 11);
        text = str.replace(regex, "($1)$2-$3")
        setUpdateData({
            ...updateData,
            telephoneNumber: text
        })
    }

    const handleChangeBirth = (text) => {
        if (text.length == 2 || text.length == 5) {
            text = text + '/'
        }
        setUpdateData({
            ...updateData,
            dateBirthDay: text
        })
    }

    const handleSend = async () => {
        const { telephoneNumber, dateBirthDay } = updateData

        if (!dateBirthDay) { Alert.alert('MyBank', "O campo data de nascimento é obrigatório") }
        if (!telephoneNumber || telephoneNumber?.length < 14 || telephoneNumber?.length > 15) { Alert.alert('MyBank', "O numero de telefone é invalido") }
        else {
            await update(updateData)
            navigation.goBack()
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={{ display: 'flex', marginTop: 55, height: 50, alignItems: 'center' }}>
                    <Avatar />
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>
            <Spacer size={2} />
            <Text style={{ fontSize: 18, textAlign: 'center' }}>Alteração de Dados:</Text>
            <Spacer size={2} />

            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>ID usuário </Text>
                <Text style={styles.infoData}>{user._id}</Text>
            </TouchableOpacity>
            <Spacer size={4} />
            <View>
                <Text style={{ marginLeft: 20, color: Colors.primary, fontWeight: 'bold', fontSize: 16, marginBottom: 6 }}>Telefone: </Text>
                <TextInput
                    placeholderTextColor={Colors.lightGray}
                    placeholder='fulano@gmail.com'
                    name="telephoneNumber"
                    value={updateData.telephoneNumber}
                    autoCapitalize="none"
                    onChangeText={(text) => handleChangeTel(text)}
                    style={{ width: '90%', height: 40, fontSize: 16, color: Colors.darkGray, textAlign: 'left', borderRadius: 3, marginLeft: '5%', borderBottomWidth: 1, borderColor: Colors.primary, paddingLeft: 8 }}

                />
                <Spacer size={2} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 20, color: Colors.primary, fontWeight: 'bold', fontSize: 16, marginBottom: 6 }}>Data de Nascimento: </Text>
                </View>
                <TextInput
                    placeholderTextColor={Colors.lightGray}
                    placeholder='******'
                    name="dateBirthDay"
                    value={updateData.dateBirthDay}
                    autoCapitalize="none"
                    onChangeText={(text) => handleChangeBirth(text)}
                    style={{ width: '90%', height: 40, fontSize: 16, color: Colors.darkGray, textAlign: 'left', borderRadius: 3, marginLeft: '5%', borderBottomWidth: 1, borderColor: Colors.primary, paddingLeft: 8 }}
                />
                <Spacer size={2} />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.buttonLogin} onPress={() => { handleSend() }}>
                        <Text style={{ color: '#B22222', fontSize: 17 }}>Alterar dados</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    containerHeader: {
        flexDirection: 'row',
        backgroundColor: '#06373d',
        width: '100%',
        minHeight: 150,
        maxHeight: 150,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    userName: {
        color: Colors.lightGray,
        fontSize: 14,
        textAlign: 'center',
        marginLeft: 10,
        marginTop: 5
    },
    containerInfos: {
        width: "98%",
        flexDirection: 'row',
        padding: 5
    },
    divider: {
        width: "100%",
        backgroundColor: '#A9A9A9',
    },
    menuItem: {
        // flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',

    },
    menuItemText: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    buttonLogin: {
        borderWidth: 1,
        borderColor: '#B22222',
        padding: 7,
        width: '50%',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10
    },

});