/* eslint-disable prettier/prettier */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerBar from '../components/Drawer';
import TabNavigator from './TabNavigator'; // Import TabNavigator

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <>
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="TabNavigator" component={TabNavigator} /> 
      <Drawer.Screen name="Drawer" component={DrawerBar} />
    </Drawer.Navigator>
    </>
  );
}
