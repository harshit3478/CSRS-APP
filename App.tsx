/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);

// import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';

// console.log(process.env.API_URL , 'API_URL' , process.env.TEST , 'TEST');
function App(): React.JSX.Element {
  return (
    <>
      <View style={styles.container}>
        <AppStack />
        {/* <AuthStack /> */}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
export default App;
