/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '../screens/authScreens/Register';
import LoginScreen from '../screens/authScreens/Login';
import AuthHomeScreen from '../screens/authScreens/AuthHomeScreen';
import OtpScreen from '../screens/authScreens/OtpVerificationScreen';
import AuthSuccessScreen from '../screens/authScreens/AuthSuccessScreen';
import ForgotPasswordScreen from '../screens/authScreens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/authScreens/ResetPasswordScreen';


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