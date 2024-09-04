/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login';
import AuthHomeScreen from '../screens/AuthHomeScreen';
import OtpScreen from '../screens/OtpVerificationScreen';
import AuthSuccessScreen from '../screens/AuthSuccessScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="authHome" component={AuthHomeScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="otp" component={OtpScreen} />
        <Stack.Screen name="authSuccess" component={AuthSuccessScreen} />
        <Stack.Screen name="forgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="resetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;