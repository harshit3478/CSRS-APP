/* eslint-disable prettier/prettier */
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import colors from '../utils/colors';

export default function BackButton({color= "white"}) {
  const navigation = useNavigation();
  return (
    
      <TouchableOpacity style={styles.container} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={20} color={color} />
      </TouchableOpacity>
  
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: colors.white,
    // borderColor: colors.white,
    // borderWidth: 1,
    padding: 10,
    color: colors.white,
    borderRadius: 10,
    
  },
});
