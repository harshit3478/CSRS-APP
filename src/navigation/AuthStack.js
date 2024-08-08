/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/Register';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="login" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;