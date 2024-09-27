/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import {useUser} from '../../context/userContext';
import {VERIFICATION_TYPES} from '../../constants/verificationTypes';
import {useNavigation} from '@react-navigation/native';
import colors from '../../utils/colors';
const {width, height} = Dimensions.get('window');

export default function ForgotPasswordScreen({navigation}) {
  const {control, handleSubmit} = useForm();
  const [loading, setLoading] = useState(false);
  const {updateVerificationDetails} = useUser();

  async function handleForgotPassword(data) {
    console.log(data);
    const {email} = data;
    try {
      setLoading(true);
      // Call the forgot password API
      const response = await fetch(
        process.env.API_URL + '/auth/v1/login/email',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: email}),
        },
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        ToastAndroid.show(
          'Verification code sent successfully',
          ToastAndroid.LONG,
        );
        updateVerificationDetails(data, VERIFICATION_TYPES.RESET_PASSWORD);
        navigation.navigate('otp');
      } else {
        ToastAndroid.show(
          'Error sending verification code : ' + result.message,
          ToastAndroid.LONG,
        );
      }
    } catch (err) {
      console.log('ERROR IS ', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle={'light-content'} backgroundColor={'blue'} />
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.header}>
              <BackButton color="black" />
              <Text
                className="text-3xl text-black  font-bold text-center"
                style={{fontFamily: 'Urbanist'}}>
                Forgot Password
              </Text>
            </View>
            <View style={styles.body}>
              <View style={styles.textContainer}>
                <Text
                  className=" text-xl text-left text-slate-500"
                  style={{fontFamily: 'Urbanist'}}>
                  Please enter your email address linked with your account
                </Text>
              </View>
              <View style={styles.form}>
                <CustomInput
                  control={control}
                  name="email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Enter a valid email address',
                    },
                  }}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
                <CustomButton
                  title="Send Code"
                  onPress={handleSubmit(handleForgotPassword)}
                  loading={loading}
                  disabled={loading}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'flex-start',
    // justifyContent: 'space-evenly',
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  textContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 10,
  },
  body:{
    // backgroundColor: colors.lightPrimary,
    width: '100%',
    flex: 1,
    // padding: 20,
  },
  form: {
    width: '100%',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  // line:{
  //   height: .1,
  //   borderTopColor: 'black',
  //   borderWidth: .2,
  //   width: '100%'
  // }
});
