/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

import colors from '../utils/colors';
import {fontScale} from 'nativewind';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry = false,
  disabled = false,               
  keyboardType = 'default',       
  defaultValue = '',              
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}  // Ensure default value is handled
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
            style={[
              styles.input,
              isFocused && styles.input.onFocused,
              disabled && styles.disabled,  // Apply disabled style if input is disabled
            ]}
            secureTextEntry={secureTextEntry}
            placeholderTextColor='#a3aeba'
            editable={!disabled}             // Make TextInput non-editable if disabled
            keyboardType={keyboardType}      // Set keyboard type
            placeholderStyle={{fontFamily: 'Urbanist', fontScale: fontScale(16)}}
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
    fontFamily: 'Urbanist-black',
    onFocused: {
      borderColor: colors.primary,
      borderWidth: 1.3,
    },
  },
  disabled: {
    backgroundColor: '#e0e0e0',   // Style for disabled input
  },
  error: {
    marginTop: -8,
    marginBottom: 0,
    color: 'red',
    alignSelf: 'stretch',
  },
});

export default CustomInput;
