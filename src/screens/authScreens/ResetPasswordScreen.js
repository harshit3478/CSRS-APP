/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {View, Text, SafeAreaView, ToastAndroid} from 'react-native';
import { useForm } from 'react-hook-form';

import { useUser } from '../../context/userContext';
import BackButton from '../../components/BackButton';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

export default function ResetPasswordScreen({navigation}) {
    const {control , handleSubmit, getValues} = useForm();
    const [loading , setLoading] = useState(false);
    const {verificationDetails} = useUser();
    const {email } = verificationDetails;

    async function handleResetPassword(data){
        console.log(data)
        const {password} = data;
        try{
            setLoading(true)
            // Call the reset password API
            console.log('email is ' , email)
            console.log('password is ' , password)
            console.log("api url is " , process.env.API_URL)
            const response = await fetch(process.env.API_URL + "/auth/v2/update/password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {email , password}),
            });
            const result = await response.json();
            console.log(result);
            if(response.ok){
                ToastAndroid.show('Password reset successfully', ToastAndroid.LONG);
                navigation.navigate('authSuccess' , {title : 'Password Changed!' , subText:'Your password has been changed successfully.' , btnText : 'Back to login' , path: 'login'})
            }else{
                ToastAndroid.show('Error resetting password : ' + result.message, ToastAndroid.LONG);
            }
        }catch(err){
            console.log("ERROR IS " , err)
        }finally{
            setLoading(false)
        }
    }

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
                placeholder="Password"
                secureTextEntry={true}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      'Password must be strong (include letters, numbers, and special characters)',
                  },
                }}
              />
              <CustomInput
                control={control}
                name="cnfpassword"
                placeholder="Confirm Password"
                secureTextEntry={true}
                rules={{
                  required: 'Confirm Password is required',
                  validate: value =>
                    value === getValues('password') || 'Passwords do not match',
                }}
              />

            <CustomButton
              title="Reset Password"
              onPress={handleSubmit(handleResetPassword)}
              loading={loading}
              disabled={loading}
            />
          </View>
        
      </View>
    </SafeAreaView>
  );
}
