/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import CustomInput from '../components/CustomInput';
import {useForm} from 'react-hook-form';
import CustomButton from '../components/CustomButton';
import { Avatar } from '../components/Avatar';

const RegisterScreen = () => {
  const {control, handleSubmit} = useForm();
  const onAvatarChange = image => {
    console.log('Avatar changed', image);
    };
  return (
    <View>
        <Avatar source={require('../../assets/profile.png')} onChange={onAvatarChange} />
      <CustomInput
        name={'email'}
        placeholder="Email"
        secureTextEntry={false}
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Email is required',
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        }}
      />
      <CustomInput
        name={'password'}
        placeholder="Password"
        secureTextEntry={true}
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Password is required',
          },
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        }}
      />
      <CustomInput
        name={'phone'}
        placeholder={'Phone'}
        secureTextEntry={false}
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Phone is required',
          },
          minLength: {
            value: 10,
            message: 'Phone must be at least 10 characters',
          },
        }}
      />
      <CustomInput
        name={'name'}
        placeholder={'Name'}
        secureTextEntry={false}
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Name is required',
          },
          minLength: {
            value: 3,
            message: 'Name must be at least 3 characters',
          },
        }}
      />
      <CustomInput
        name={'roll no'}
        placeholder={'Roll No'}
        secureTextEntry={false}
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Roll No is required',
          },
          minLength: {
            value: 10,
            message: 'Roll No must be at least 10 characters',
          },
        }}
      />

      <CustomButton
        bgColor={'skyblue'}
        fgColor={'#000'}
        text="Sign Up"
        onPress={handleSubmit(data => console.log(data))}
      />
    </View>
  );
};

export default RegisterScreen;
