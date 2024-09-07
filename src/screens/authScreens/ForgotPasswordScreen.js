/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';

export default function ForgotPasswordScreen({navigation}) {
  const {control, handleSubmit} = useForm();
  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 p-5  gap-5 items-start ">
          <View>
           <BackButton />
          </View>

          <View className=" items-start gap-1 mt-44 mb-10">
            <Text className="text-3xl text-black  font-bold text-center" style={{fontFamily:'Urbanist'}}>
              Forgot Password
            </Text>
            <Text className=" text-xl text-left text-slate-500" style={{fontFamily:'Urbanist'}}>
              Please enter your email address linked with your account
            </Text>
          </View>
          <View className="mt-10 p-0 m-0 self-stretch">
            <CustomInput
              control={control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            <CustomButton
              title="Send Code"
              onPress={handleSubmit(data => navigation.navigate('resetPassword'))}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
