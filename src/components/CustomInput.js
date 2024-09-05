/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

import colors from '../utils/colors';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={() => {
              onBlur();
              setIsFocused(false);
            }}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            style={[styles.input, isFocused && styles.input.onFocused]}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={colors.gray}
          />
          {error && (
            <Text style={styles.error}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    color: 'black',
    borderRadius: 8,
    marginVertical: 9,
    padding: 15,
    backgroundColor: colors.grayBackground,
    fontFamily: 'Urbainst',
    onFocused: {
      borderColor: colors.primary,
      borderWidth: 1.3,
    },
  },

  error: {
    marginTop: -8,
    marginBottom: 0,
    color: 'red',
    alignSelf: 'stretch',
  },
});

export default CustomInput;
