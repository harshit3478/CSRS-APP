/* eslint-disable prettier/prettier */
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../utils/colors';

export default function BackButton() {
    const navigation = useNavigation();
  return (
    <View style={styles.container} >
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={20} color="black" />
        </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
       alignSelf: 'flex-start',
        borderColor: colors.lightgray,
        borderWidth: 1.5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
    }
})
