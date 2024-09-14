/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, Pressable, ActivityIndicator} from 'react-native';

import colors from '../utils/colors';

const CustomButton = ({onPress, title, type = 'PRIMARY', loading = false, disabled=false}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, styles[`container_${type}`], disabled ? styles.disabled : null] }>
      {loading ? (
        <ActivityIndicator
          color={type === 'PRIMARY' ? 'white' : colors.primary}
          size={30}
        />
      ) : (
        <Text style={[styles.text, styles[`text_${type}`]]}>{title}</Text>
      )}
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
  disabled: {
    backgroundColor: colors.grayBackground,
    cursor: 'not-allowed',
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
