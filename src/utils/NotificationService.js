// src/utils/NotificationService.js
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {Linking, ToastAndroid} from 'react-native';
import {
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import firebase from '@react-native-firebase/app';

class NotificationService {
  // Request necessary permissions
  requestPermissions = async () => {
    try {
      const statuses = await checkMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.READ_CONTACTS,
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        PERMISSIONS.ANDROID.CALL_PHONE,
      ]);

      const permissionStatus = Object.values(statuses).every(
        status => status === RESULTS.GRANTED,
      );

      if (!permissionStatus) {
        const results = await requestMultiple([
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.READ_CONTACTS,
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
          PERMISSIONS.ANDROID.CALL_PHONE,
        ]);

        if (Object.values(results).some(status => status !== RESULTS.GRANTED)) {
          // console.log('Some permissions were denied:', results);
        }
      }
    } catch (err) {
      console.warn('Error requesting permissions:', err);
    }
  };

  // Initialize Firebase
  initializeFirebase = async () => {
    const RNfirebaseConfig = {
      apiKey: 'AIzaSyAEtM4bk9_9grmhsA1gzZkUf5JIjag3BH8',
      projectId: 'csrs-react-native-app',
      appId: '1:690505830379:android:4b2dbd52d097797c4d93ae',
    };

    if (firebase.apps.length === 0) {
      await firebase.initializeApp(RNfirebaseConfig);
      console.log('Firebase Initialized');
    } else {
      console.log('Firebase already initialized');
    }
  };
  // Initialize Firebase Push Notification
  initializeNotification = () => {
    PushNotification.createChannel({
      channelId: 'sos-channel',
      channelName: 'SOS Notifications',
      importance: 4,
      vibrate: true,
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      this.showNotification(remoteMessage);
    });

    PushNotification.configure({
      onNotification: this.handleNotification,
    });
  };

  // Function to show local notification
  showNotification = remoteMessage => {
    PushNotification.localNotification({
      channelId: 'sos-channel',
      title: remoteMessage.data?.title || 'New Notification',
      message: remoteMessage.data?.body || 'Check the message',
      smallIcon: 'ic_notification',
      priority: 'high',
      data: {
        ...remoteMessage.data,
        latitude: remoteMessage.data?.latitude,
        longitude: remoteMessage.data?.longitude,
      },
    });
  };

  // Handle notification when tapped
  handleNotification = notification => {
    const notificationData = notification.data || notification;
    const latitude = notificationData.langitude || notificationData.latitude;
    const longitude = notificationData.longitude;

    console.log('latitude:', latitude);
    console.log('longitude:', longitude);

    if (notification.userInteraction && latitude && longitude) {
      const googleMapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
      Linking.openURL(googleMapsUrl).catch(err =>
        console.error('Failed to open URL:', err),
      );
    } else {
      console.error('Latitude or longitude is undefined');
    }
  };
  onMessageReceived = callback => {
    return messaging().onMessage(callback);
  };
}

export default new NotificationService();
