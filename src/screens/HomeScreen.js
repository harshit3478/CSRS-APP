/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
// import { MenuIcon, MapPinIcon } from 'react-native-heroicons/outline';
import Icon from 'react-native-vector-icons/Ionicons';

import SosBg from '../../assets/sos_bg.svg';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [timer, setTimer] = useState(5); // Timer starts at 5 seconds
  const [isPressed, setIsPressed] = useState(false);
  const [color, setColor] = useState('bg-blue-400'); // Initial color blue
  const animatedValue = new Animated.Value(1);

  useEffect(() => {
    let countdown;

    if (isPressed && timer > 0) {
      countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setColor('bg-red-400'); // Change shadow to red when timer hits 0
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [isPressed, timer]);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    setTimer(5); // Reset timer
    setColor('bg-blue-400'); // Reset color
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
      <View className="bg-[#4E32FF] rounded-b-2xl p-4 shadow-md">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center space-x-2">
            {/* <MapPinIcon size={30} color="white" /> */}
            <Icon name="location-outline" size={30} color="white" />
            <View>
              <Text className="text-base font-semibold text-white">
                Kharagpur
              </Text>
              <Text className="text-xs text-white">
                Nalanda Classroom Complex
              </Text>
            </View>
          </View>
          <View>
            <Icon name="menu-outline" size={30} color="white" />
          </View>
        </View>
      </View>
      <View className="flex-col py-16 px-5 space-y-2">
        <Text className="text-2xl text-center text-black font-urbanist font-medium">
          Are you in an Emergency?
        </Text>
        <Text className="text-lg text-center text-neutral-500 font-urbanist font-normal">
          Press for 5 seconds in case of emergency. Your emergency contacts and
          nearby rescue services will be notified.
        </Text>
      </View>
      <View className="flex items-center justify-center relative text-center">
        <SosBg className="w-40 h-40"/>
        <View className="flex items-center justify-center w-full absolute text-center">
          <Text className="text-white text-5xl font-urbanist">
            SOS
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
// const styles = StyleSheet.create({});
