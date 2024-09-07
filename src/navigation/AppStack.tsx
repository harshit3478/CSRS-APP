/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SOSScreen from '../screens/appScreens/SOSScreen';
import AddContactScreen from '../screens/appScreens/AddContactScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="SOSScreen" component={SOSScreen}/>
        <Stack.Screen name="AddContact" component={AddContactScreen}/>  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;