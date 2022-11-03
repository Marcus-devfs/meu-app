import { TextInput, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from './Colors';
import { useState } from 'react'

export const TextInputState = (props) => {

   const [showPassword, setShowPassword] = useState(false)

   const {
      handleChange,
      type = 'text',
      containerStyle,
      label,
      secureTextEntry
   } = props

   return (
      <View style={[containerStyle]}>
         {label && <Text style={{ ...styles.textInputLabel, color: Colors.primary }}>{label}</Text>}
         <View style={{
            backgroundColor: '#FFF',
            borderRadius: 8,
            width: 320,
            paddingVertical: 6,
            marginBottom: 8,
            flexDirection:'row',
         }}>
            <TextInput
               {...props}
               secureTextEntry={(secureTextEntry && !showPassword)}
               value={props.value}
               underlineColorAndroid={'rgba(0,0,0,0)'}
               onChangeText={(value) => handleChange(props.name, value)}
               style={[styles.textInput]}
            />
            {type == 'password' &&
               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? 'eye-sharp' : 'eye-off-sharp'} size={25} color={Colors.secondaryDisabled} style={{paddingRight: 8, alignItems: 'center'}}/>
               </TouchableOpacity>}
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   textInputLabel: {
      fontSize: 16,
      marginBottom: 5,

   },
   textInput: {   
      marginLeft: 5,
      fontSize: 16,
      flex: 1,
      color: Colors.secondary
   }
})