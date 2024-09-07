/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import {Alert, BackHandler, Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../utils/colors';
import SOSButton from '../../components/SOSButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function SOSScreen() {
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // Reset timer when screen gains focus
      setMins(0);
      setSecs(0);

      // Timer logic
      const interval = setInterval(() => {
        setSecs(prevSecs => {
          if (prevSecs + 1 === 60) {
            setMins(prevMins => prevMins + 1);
            return 0;
          }
          return prevSecs + 1;
        });
      }, 1000); // Update every second

      // Disable back button functionality
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

      // Cleanup on component unmount or when losing focus
      return () => {
        clearInterval(interval);
        backHandler.remove(); // Remove back button handler
      };
    }, []) // Empty dependency array to ensure this effect runs once on focus
  );
  const handleCancelPress = () => {
    Alert.alert(
      'Cancel SOS',
      'Are you sure you want to cancel the SOS?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          // navigate to home screen without pushing to stack so SOS button is reset
          onPress: () => navigation.navigate('TabNavigator', { screen: 'TabNavigator' }),
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <View className="flex flex-1 items-center justify-evenly">

        <View style={{ paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 24, textAlign: 'center', color: 'black', fontFamily: 'Urbanist', fontWeight: '500' }}>
            Help is on the way..
          </Text>
          <Text style={{ fontSize: 18, textAlign: 'center', color: '#6B7280', fontFamily: 'Urbanist', fontWeight: '400' }}>
            Your emergency contacts and nearby rescue services have been notified.
          </Text>
        </View>

        <SOSButton onPressIn={() => {}} onPressOut={() => {}}>
          <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 56, textAlign: 'center' }}>
              {mins < 10 ? '0' + mins : mins}:{secs < 10 ? '0' + secs : secs}
            </Text>
          </View>
        </SOSButton>

        {/* Cancel SOS button */}
        <Pressable
          style={{
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            borderRadius: 8,
          }}
          onPress={handleCancelPress}
          >
          <Icon name="close" size={25} color="red" />
          <Text style={{ color: 'red', marginLeft: 8 }}>Cancel SOS</Text>
        </Pressable>
          </View>
      </SafeAreaView>
    </>
  );
}
