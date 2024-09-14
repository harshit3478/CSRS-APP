// src/navigation/AppNavigator.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useAuth } from '../context/authenticationContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { ActivityIndicator } from 'react-native';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {user, loading} = useAuth();
  console.log("user" , user)
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name="App" component={AppStack}  />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
