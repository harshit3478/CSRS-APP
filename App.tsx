/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppStack from './src/navigation/AppStack';
import { Text, View } from 'react-native';
import AuthStack from './src/navigation/AuthStack';

function App(): React.JSX.Element {
  return (
    <>
    <View style={{flex: 1}}>
      {/* <Text>Test</Text> */}
      <AppStack />
      {/* <AuthStack /> */}
    </View>
    </>
  )
}

export default App;
