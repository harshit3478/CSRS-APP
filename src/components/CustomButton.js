/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

import colors from '../utils/colors';

const CustomButton = ({onPress, title, type = 'PRIMARY'}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
  },

  container_PRIMARY: {
    backgroundColor: colors.primary,
  },
  container_OUTLINED: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.primary,
  },

  text: {
    fontWeight: 'bold',
    fontFamily: 'Urbanist',
    fontSize: 20,
  },

  text_PRIMARY: {
    color: 'white',
  },
  text_OUTLINED: {
    color: colors.primary,
  },
});

export default CustomButton;
