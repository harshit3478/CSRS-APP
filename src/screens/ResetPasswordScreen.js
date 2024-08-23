/* eslint-disable prettier/prettier */
import React from 'react';

import {View, Text, SafeAreaView} from 'react-native';
import BackButton from '../components/BackButton';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useForm } from 'react-hook-form';

export default function ResetPasswordScreen({navigation}) {
    const {control , handleSubmit} = useForm();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-5 bg-blue-30 gap-5 items-start">
        <View>
          <BackButton />
        </View>
        <View className=" items-start gap-1 mt-44 mb-10">
          <Text className="text-3xl text-black  font-bold text-center" style={{fontFamily:'Urbanist'}}>
            Create new password
          </Text>
          <Text className=" text-xl text-left text-slate-500" style={{fontFamily:'Urbanist'}} >
            Your new password must be unique from those previously used.
          </Text>
        </View>
        <View className="mt-10 p-0 m-0 self-stretch">
            <CustomInput
              control={control}
              name="password"
              label="New Password"
              placeholder="New password"
              keyboardType="text"
            />
            <CustomInput
              control={control}
              name="cnfpassword"
              label="Confirm New Password"
              placeholder="Confirm new password"
              keyboardType="text"
            />
            <CustomButton
              title="Reset Password"
              onPress={handleSubmit(data => navigation.navigate('authSuccess' , {title : 'Password Changed!' , subText:'Your password has been changed successfully.' , btnText : 'Back to login' , path: 'login'}))}
            />
          </View>
        
      </View>
    </SafeAreaView>
  );
}
