/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ToastAndroid,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationService from '../../utils/NotificationService'; // Import NotificationService
import ApiService from '../../utils/ApiService'; // Import ApiService
import { useAuth } from '../../context/authenticationContext';
import HeaderSection from '../../components/HeaderSection';
import SOSButton from '../../components/SOSButton';
import { useUser } from '../../context/userContext';


export default function HomeScreen({}) {
  const navigation = useNavigation();
  const { logout, user } = useAuth();
  const { addContact, removeContact, contacts, clearContacts } = useUser();
  const { email } = user.data;
  const [timer, setTimer] = useState(5); // Timer starts at 5 seconds
  const [isPressed, setIsPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const animatedValue = new Animated.Value(1);

  useEffect(() => {
    // Initialize Firebase and Notifications
    NotificationService.requestPermissions(); // Request permissions
    NotificationService.initializeFirebase(); // Initialize Firebase
    NotificationService.initializeNotification(); // Setup Push Notification
    const unsubscribe = NotificationService.onMessageReceived(remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      NotificationService.showNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  // Emergency initiation
  async function initiateEmergency() {
    setLoading(true);
    const result = await ApiService.initiateEmergency(email);
    if (result.success) {
      navigation.navigate('SOSScreen');
      console.log('Emergency initiated');
    } else {
      console.log('Error initiating emergency');
      ToastAndroid.show('A problem occurred: ' + result.message, ToastAndroid.SHORT);
    }
    setLoading(false);
  }

  useEffect(() => {
    let countdown;

    if (isPressed && timer > 0) {
      countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
      initiateEmergency();
    }

    return () => clearInterval(countdown);
  }, [isPressed, timer]);

  const handlePressIn = () => {
    if (!isPressed) {
      animatePress();
    }
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    setTimer(5); // Reset timer
  };

  const animatePress = () => {
    Animated.timing(animatedValue, {
      toValue: 1.5,
      duration: 5000, // Timer duration
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView>
      <HeaderSection>
        <View className="flex-row items-center space-x-2">
          <Icon name="location-outline" size={30} color="white" />
          <View>
            <Text className="text-base font-semibold text-white">Kharagpur</Text>
            <Text className="text-xs text-white">Nalanda Classroom Complex</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon name="menu-outline" size={30} color="white" />
        </TouchableOpacity>
      </HeaderSection>

      <View className="flex-col py-16 px-5 space-y-2">
        <Text className="text-2xl text-center text-black font-urbanist font-medium">
          Are you in an Emergency?
        </Text>
        <Text className="text-lg text-center text-neutral-500 font-urbanist font-normal">
          Press for 5 seconds in case of emergency. Your emergency contacts and
          nearby rescue services will be notified.
        </Text>
      </View>

      <SOSButton
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        isTapped={isPressed}>
        <View className="flex w-full items-center justify-center text-center bg-blue-20">
          {isPressed ? (
            <Text className="text-white text-9xl font-urbanist p-2">{timer}</Text>
          ) : (
            <>
              <Text className="text-white text-7xl font-urbanist">SOS</Text>
              <Text className="text-white text-2xl font-urbanist">Hold for 5s</Text>
            </>
          )}
        </View>
      </SOSButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  drawerItem: {
    fontSize: 18,
    marginVertical: 8,
  },
});
