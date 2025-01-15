import './gesture-handler';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthenticationProvider } from './src/context/authenticationContext';
import { UserProvider } from './src/context/userContext';
import NotificationService from './src/utils/NotificationService';

const App = () => {

  useEffect(() => {
    // NotificationService.requestPermissions();
    // NotificationService.initializeFirebase();
    // NotificationService.initializeNotification();
  }, []);

  return (
    <AuthenticationProvider>
      <UserProvider>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </UserProvider>
    </AuthenticationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default App;
