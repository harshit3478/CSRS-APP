import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Button, Animated } from "react-native";

import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


import HeaderSection from '../../components/HeaderSection';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [pressing, setPressing] = useState(false);
  const [timer, setTimer] = useState(5);
  const [SOSActive,setSOSActive] = useState(false);
  const animatedValue = new Animated.Value(1);

  useEffect(() => {
    let interval = null;
    if (pressing) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime > 0 ? prevTime-1: 0);
      }, 1000);
    } else if (!pressing && timer !== 5) {
      clearInterval(interval);
      setTimer(5);
    }
    if (timer === 0) {
      handleEmergency();
      setSOSActive(true);
    }
    return () => clearInterval(interval);
  }, [pressing, timer]);

  const handleEmergency = () => {
    Alert.alert(
      "Emergency Alert",
      "Your emergency contacts and services have been notified!"
    );
  };

  const cancelSOS = () => {
    setTimer(5);
    setSOSActive(false);
    setPressing(false)
  }

  return (
    <SafeAreaView style={{
      flex:1
    }} >
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
      <View style={styles.container}>
        <Text style={styles.title}>  {pressing ? !SOSActive ? 'Generating SOS...': 'Help is on the way ...' : 'Are you in Emergency?'} </Text>
        <Text style={styles.subtitle}>
          Press for 5 seconds in case of emergency. Your emergency contacts and
          nearby rescue services will be notified.
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPressIn={() => setPressing(true)}
          onPressOut={() => setPressing(false)}
          style={styles.sosButton}
        >
            <View>
              {
                SOSActive ? (
                  <Text style={styles.sosText}> 00:00 </Text>
                ):
                  <View>
                    <Text style={styles.sosText}>SOS</Text>
                    <Text style={styles.sosSubtitle}> Press for {timer} seconds</Text>  
                  </View> 
              }
            </View>
          
        </TouchableOpacity>

        {
          SOSActive ? (
            <TouchableOpacity onPress={cancelSOS}
            >
            <Text 
              >X Cancel SOS
            </Text>
          </TouchableOpacity>): null
        }

      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 40
  },
  sosText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
  },
  sosSubtitle: {
    fontSize: 14,
    color: "#FFF",
    marginTop: 5,
  },
  sosCancel: {
    color: '#FF3B30'
  }

});


  // import { MenuIcon, MapPinIcon } from 'react-native-heroicons/outline';
// import { NativeModules } from 'react-native';
// import SharedGroupPreferences from 'react-native-shared-group-preferences';
// const group = 'group.asap';
// const { SharedStorage } = NativeModules;
// import SosBg from '../../assets/sos_bg.svg';
// import { useAuth } from '../../context/authenticationContext';
// import SOSButton from '../../components/SOSButton';
// import CustomButton from '../../components/CustomButton';

  // const [timer, setTimer] = useState(5); // Timer starts at 5 seconds

  // const [color, setColor] = useState('bg-blue-400'); // Initial color blue
  // const {logout} = useAuth(); // Logout function
  // useEffect(() => {
  //   const widgetData = { widgetClicked: false };
  //   async function setForIOS() {
  //     try {
  //       // iOS
  //       await SharedGroupPreferences.setItem('widgetKey', widgetData, group);
  //     } catch (error) {
  //       console.log({error});
  //     }
  //   }

  //   const widgetClicked = SharedStorage.get('widgetClicked');
  //   console.log('widget code: ' + JSON.stringify(widgetClicked));

  //   setForIOS();
  //   // Android
  //   SharedStorage.set('widgetClicked', false);
  // }, []);

  // useEffect(() => {
  //   let countdown;

  //   if (isPressed && timer > 0) {
  //     countdown = setInterval(() => {
  //       setTimer(prevTimer => prevTimer - 1);
  //     }, 1000);
  //   } else if (timer === 0) {
  //     clearInterval(countdown);

  //     navigation.navigate('SOSScreen');
  //   }

  //   return () => clearInterval(countdown);
  // }, [isPressed, navigation, timer]);

  // const animatePress = () => {
  //   Animated.timing(animatedValue, {
  //     toValue: 1.5,
  //     duration: 5000, // Timer duration
  //     useNativeDriver: true,
  //   }).start();
  // };
