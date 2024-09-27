/* eslint-disable prettier/prettier */
import React from 'react'
import { Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native';

import colors from '../utils/colors';

export default function LogoButton({onPress, source}) {
  return (
    <>
    <TouchableOpacity onPress={onPress} style={styles.button}>
    <Image source={source} style={styles.logo} />
    </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
    button:{
        paddingVertical:10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderColor:colors.lightText,
        borderWidth: 1,
        // flex:1,
        alignItems:'center',
        justifyContent:'center',
        // back
    },
    logo:{
        width: 70,
        height: 50,
    },
})
