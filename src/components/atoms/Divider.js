import { View, StyleSheet } from 'react-native'

export const Divider = (props) => {

   const { type = 'h', style } = props;

   if (type == 'v') return (
      <View style={{ width: StyleSheet.hairlineWidth, backgroundColor: '#A9A9A9' , marginBottom: 10}} />
   )

   return (
      <View style={[{
         height: StyleSheet.hairlineWidth,
         backgroundColor: "#A9A9A9"
      }, style]} />
   )
}