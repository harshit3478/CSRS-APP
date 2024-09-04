/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {Link, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import colors from '../utils/colors';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import LogoButton from '../components/LogoButton';
import BottomSection from '../components/BottomSection';
import BackButton from '../components/BackButton';
const {width, height} = Dimensions.get('window');


const LoginScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  console.log(width, height);

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <BackButton />

          <View style={styles.motto}>
            <Text style={styles.heading}>Welcome back!</Text>
            <Text style={styles.subHeading}>Login to get started</Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              control={control}
              name="email"
              rules={{required: 'Email is required'}}
              placeholder="Enter your email"
            />
            <CustomInput
              control={control}
              name="password"
              rules={{required: 'Password is required'}}
              placeholder="Enter your password"
              secureTextEntry={true}
            />
            <Link style={styles.forgot} to="/forgotPassword">
              Forgot password?
            </Link>
            <CustomButton
              title="Login"
              onPress={handleSubmit(data => {
                console.log(data);
                navigation.navigate('Home');
              })}
            />

            <View style={styles.thirdParty}>
              <View style={styles.line}>
                <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
                <Text style={styles.loginWith}>Or Login with</Text>
                <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
              </View>
              <View style={styles.buttons}>
                <LogoButton
                  source={require('../../assets/facebook_icon.png')}
                  onPress={() => {}}
                />
                <LogoButton
                  source={require('../../assets/google_icon.png')}
                  onPress={() => {}}
                />
                <LogoButton
                  source={require('../../assets/apple_icon.png')}
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>
          <BottomSection
            des="Don't have an account?"
            linkText="Register Now"
            linkPath="/register"
          />
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    alignItems: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    marginVertical: 20,
  },
  motto: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 15,
  },
  loginWith: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.gray,
    marginVertical: 25,
    marginHorizontal: 10,
  },
  line: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  heading: {
    fontSize: 25,
    textAlign: 'start',
    color: 'black',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 17,
    color: colors.gray,
    textAlign: 'start',
  },
});

export default LoginScreen;
