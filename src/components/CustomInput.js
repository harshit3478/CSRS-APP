/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, TextInput, StyleSheet, View, Pressable } from 'react-native';
import { Controller, set } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../utils/colors';
import { fontScale } from 'nativewind';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry = false,
  editable = true,    // Prop to control if the field is editable
  keyboardType = 'default',
  defaultValue = '',
  icon = null,
  onIconPress = () => {},
}) => {
  const [isEditable, setIsEditable] = useState(true); // State to manage editable status
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    if(icon){
      console.log('Icon:', icon);
      setIsEditable(false);
    }
  }, [icon]);

  const toggleEditable = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);
    setIsFocused(true)
    onIconPress(); // Call the passed icon press handler
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={styles.container}>
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
                !isEditable && styles.disabled,
              ]}
              secureTextEntry={secureTextEntry}
              placeholderTextColor='#a3aeba'
              editable={isEditable} // Control editability
              keyboardType={keyboardType}
              placeholderStyle={{ fontFamily: 'Urbanist', fontScale: fontScale(16) }}
            />
            {icon && (
              <Pressable style={styles.iconButton} onPress={(e)=> toggleEditable(e)}>
                <Icon name={icon} size={20} color={colors.lightText} style={styles.icon} />
              </Pressable>
            )}
            {error && (
              <Text style={styles.error}>{error.message || 'Error'}</Text>
            )}
          </View>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    width: '100%',
    height: '100%',
    color: colors.darkText,
    padding: 15,
    borderRadius: 8,
    backgroundColor: colors.white,
    elevation: 5,
    fontFamily: 'Urbanist-black',
    onFocused: {
      borderColor: colors.primary,
      borderWidth: 1.3,
    },
  },
  container: {
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    marginVertical: 9,
    width: '100%',
    padding: 0,
  },
  disabled: {
    backgroundColor: colors.grayBackground,
    color: colors.gray,
  },
  error: {
    marginTop: 0,
    marginBottom: 0,
    color: 'red',
    alignSelf: 'stretch',
  },
  iconButton: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
});

export default CustomInput;
