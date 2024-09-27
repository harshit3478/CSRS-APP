/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  PermissionsAndroid,
  Text,
  View,
  TouchableOpacity,
  Animated,
  StatusBar,
  Button,
  Alert,
  Linking,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
// import { MenuIcon, MapPinIcon } from 'react-native-heroicons/outline';
import Icon from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import pushNotification from 'react-native-push-notification';

// import SosBg from '../../assets/sos_bg.svg';
import {useAuth} from '../../context/authenticationContext';
import HeaderSection from '../../components/HeaderSection';
import SOSButton from '../../components/SOSButton';
import CustomButton from '../../components/CustomButton';
import { ANDROID } from 'nativewind/dist/utils/selector';

export default function HomeScreen() {
  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      pushNotification.localNotification({
        channelId: 'sos-channel',
        title: remoteMessage.data.title,
        message: remoteMessage.data.body,
      });
    });

    return unsubscribe;
  }, []);
  // useEffect(() => {
  //   pushNotification.configure({
  //     onNotification: function (notification) {
  //       console.log('Notification tapped in foreground:', notification);
  //       const latitude = notification.data.langitude;
  //       const longitude = notification.data.longitude;
  //       console.log('latitude', latitude);
  //       console.log('longitude', longitude);
  //       // Construct the Google Maps URL
  //       console.log(notification.userInteraction);
  //       if(notification.userInteraction){
  //         const googleMapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
  //         // Open Google Maps via deep link
  //         Linking.openURL(googleMapsUrl).catch(err =>
  //           console.error('Failed to open URL:', err),
  //         );
  //       }
        
  //     },
  //   });
  // }, []);
  const navigation = useNavigation();

  const [timer, setTimer] = useState(5); // Timer starts at 5 seconds
  const [isPressed, setIsPressed] = useState(false);
  const {logout , user} = useAuth(); // Logout function
  const {email } = user.data;
  console.log("email is:" , email)
  console.log('api url is : ' , process.env.API_URL)
  const animatedValue = new Animated.Value(1);
  
  async function initiateEmergency(){
    try{
      const body = JSON.stringify({
        email: email.toString(),
        latitude: "12",
        longitude: "20",
        landmark : "landmark"
      })
      const response = await fetch(process.env.API_URL + '/emergency/v1/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
    
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        navigation.navigate('SOSScreen');
        console.log('Emergency initiated');
      } else {
        console.log('Error initiating emergency');
        
      ToastAndroid.show("a problem occured " , result.message)
      }
    }catch(error){
      console.log('error is : ' , error);
      ToastAndroid.show("something went wrong" , error)
    }
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
      </HeaderSection>
      {/* <View className="bg-[#4E32FF] rounded-b-2xl p-4 shadow-md">
        <View className="flex-row justify-between items-center">
        </View>
      </View> */}
      <View className="flex-col py-16 px-5 space-y-2">
        <Text className="text-2xl text-center text-black font-urbanist font-medium">
          Are you in an Emergency?
        </Text>
        <Text className="text-lg text-center text-neutral-500 font-urbanist font-normal">
          Press for 5 seconds in case of emergency. Your emergency contacts and
          nearby rescue services will be notified.
        </Text>
      </View>
      {/* <View className="flex items-center justify-center relative text-center">
        <SosBg className="w-40 h-40"/>
        <View className="flex items-center justify-center w-full absolute text-center">
          <Text className="text-white text-5xl font-urbanist">
            SOS
          </Text>
        </View>
      </View> */}
      <Button title="Logout" onPress={initiateEmergency} style="bg-red-500" />
      <SOSButton
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        isTapped={isPressed}>
        <View className="flex w-full  items-center justify-center  text-center bg-blue-20">
          {isPressed ? (
            <Text className="text-white text-9xl font-urbanist p-2">
              {timer}
            </Text>
          ) : (
            <>
              <Text className="text-white text-7xl font-urbanist">SOS</Text>
              <Text className="text-white text-2xl font-urbanist">
                Hold for 5s
              </Text>
            </>
          )}
        </View>
      </SOSButton>
    </SafeAreaView>
  );
}
