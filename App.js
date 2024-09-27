import React, { useEffect } from 'react';
import { PermissionsAndroid, Alert, Linking } from 'react-native';
import { checkMultiple, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { View, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthenticationProvider } from './src/context/authenticationContext';
import { UserProvider } from './src/context/userContext';
import messaging, { onTokenRefresh } from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';
import { useUser } from './src/context/userContext';

const App = () => {
  useEffect(() => {
    PushNotification.createChannel({
      channelId: 'sos-channel',
      channelName: 'SOS Notifications',
      importance: 4, // High importance for heads-up notifications
      vibrate: true,
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      PushNotification.localNotification({
        channelId: 'sos-channel',
        title: remoteMessage.data?.title,
        message: remoteMessage.data?.body,
        smallIcon: 'ic_notification',
        priority: 'high',
        data: {
          ...remoteMessage.data,
          latitude: remoteMessage.data?.latitude,
          longitude: remoteMessage.data?.longitude,
        },
      });
    });
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("Notification tapped:", notification);
        
        // Check if data is in notification.data (background) or at root level (foreground)
        const notificationData = notification.data || notification;
        
        const latitude = notificationData.langitude || notificationData.latitude;
        const longitude = notificationData.longitude;
        
        console.log('latitude', latitude);
        console.log('longitude', longitude);
        console.log('userInteraction', notification.userInteraction);
        
        if (notification.userInteraction) {
          // Ensure both latitude and longitude are defined before opening the map
          if (latitude && longitude) {
            const googleMapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
            Linking.openURL(googleMapsUrl)
              .catch(err => console.error("Failed to open URL:", err));
          } else {
            console.error("Latitude or longitude is undefined");
          }
        }
      }
      
    });

  }, []);
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const statuses = await checkMultiple([
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.READ_CONTACTS,
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        ]);

        const permissionStatus = Object.values(statuses).every(
          status => status === RESULTS.GRANTED
        );

        if (!permissionStatus) {
          const results = await requestMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.READ_CONTACTS,
            PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
          ]);

          if (Object.values(results).some(status => status !== RESULTS.GRANTED)) {
            // Alert.alert('Permissions', 'Some permissions were denied.');
            // console.log('Some permissions were denied' , statuses);
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestPermissions();
  }, []);

  // Firebase & Messaging Setup
  useEffect(() => {
    const initializeFirebase = async () => {
      const RNfirebaseConfig = {
        apiKey: "AIzaSyAEtM4bk9_9grmhsA1gzZkUf5JIjag3BH8",
        projectId: "csrs-react-native-app",
        appId: "1:690505830379:android:4b2dbd52d097797c4d93ae",
      };

      if (firebase.apps.length === 0) {
        await firebase.initializeApp(RNfirebaseConfig);
        console.log('Firebase Initialized');
      } else {
        console.log('Firebase already initialized');
      }
    };

    initializeFirebase();
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
