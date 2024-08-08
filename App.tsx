/* eslint-disable prettier/prettier */


import React from 'react';
// import AppStack from './src/navigation/AppStack';
import {  StyleSheet, View } from 'react-native';
import AuthStack from './src/navigation/AuthStack';

console.log(process.env.API_URL , 'API_URL' , process.env.TEST , 'TEST');
function App(): React.JSX.Element {
  return (
    <>
    <View style={styles.container}>
      {/* <Text>Test</Text> */}
      {/* <AppStack /> */}
      <AuthStack />
    </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})
export default App;
