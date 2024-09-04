/* eslint-disable prettier/prettier */
import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation =useNavigation();
  return (
    <SafeAreaView>
     <Text>Home screen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
// const styles = StyleSheet.create({});