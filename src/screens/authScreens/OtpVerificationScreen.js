/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OTPTextView from 'react-native-otp-textinput';

import {useUser} from '../../context/userContext';
import {useAuth} from '../../context/authenticationContext';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import colors from '../../utils/colors';

export default function OtpScreen({navigation}) {
  const otpTimes = [30, 60, 90]; // Define possible countdowns for resend attempts
  let otpInput = useRef(null);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(otpTimes[0]);
  const [resendCounter, setResendCounter] = useState(0);
  const {verificationDetails, verificationType} = useUser();
  const {login} = useAuth();
  // console.log('Verification Details:', verificationDetails);
  const {email} = verificationDetails;
  useEffect(() => {
    startTimer(otpTimes[0]); // Start initial timer
    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  // Start a countdown timer
  const startTimer = time => {
    setTimer(time);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = code => {
    setOtp(code);
  };

  const handleVerify = async () => {
    console.log('Verifying OTP:', otp);
    if (otp.length !== 6) {
      ToastAndroid.show('Please enter a valid OTP', ToastAndroid.LONG);
      return;
    }
    try {
      setLoading(true);
      // Call the verification API
      const response = await fetch(process.env.API_URL + '/auth/v1/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: email,
          otp: otp,
        }),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        ToastAndroid.show('User verified successfully', ToastAndroid.LONG);
        if (verificationType === 'REGISTER') {
          // Call the register API
          console.log('Registering user with email:', email);
          await completeRegistration();
        } else if (verificationType === 'RESET_PASSWORD') {
          // Call the reset password API
          console.log('Resetting password for user with email:', email);
        }
      } else {
        ToastAndroid.show('Error verifying user: ' + result.message, ToastAndroid.LONG);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred during verification. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };
  async function completeRegistration() {
    try {
      setLoading(true);
      const response = await fetch(process.env.API_URL + '/auth/v2/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: verificationDetails.name,
          email: verificationDetails.email,
          phone: verificationDetails.phone,
          rollNo: verificationDetails.rollno,
          password: verificationDetails.password,
          deviceToken: '1234567890',
        }),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        ToastAndroid.show('User registered successfully', ToastAndroid.LONG);
        login(result.data);
        navigation.navigate('App', {
          screen: 'EditProfile',
          params: {title: 'Complete Profile'},
        });
      } else {
        ToastAndroid.show(
          'Error registering user' + result.message,
          ToastAndroid.LONG,
        );
      }
    } catch (err) {
      console.log('ERROR IS ', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (resendCounter >= 3) {
      // Show alert and navigate to login screen with different styling for alert than the default one
      Alert.alert(
        'Too many attempts',
        'You have exceeded the number of attempts. Please try again later.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('authHome'),
            style: 'cancel',
          },
        ],
      );
    }
  }, [resendCounter, navigation]);

  const handleResend = async () => {
    setLoading(true);
    try {
      setResendCounter(prev => prev + 1);
      startTimer(otpTimes[resendCounter + 1]);
      // Alert.alert('OTP Sent', 'A new OTP has been sent to your email.');
      // code for resending code here
      const response = await fetch(
        process.env.API_URL + '/auth/v1/signup/email',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        },
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        ToastAndroid.show('OTP sent successfully', ToastAndroid.LONG);
      } else {
        Alert.alert(
          'Error',
          'An error occurred while resending the OTP. Please try again.',
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while resending the OTP. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  // if(loading){
  //   return <ActivityIndicator size="large" color={colors.primary} />
  // }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <BackButton />

        <View style={styles.motto}>
          <Text style={styles.heading}>Verification Code</Text>
          <Text style={styles.subHeading}>
            We have sent you a verification code to your email address.
          </Text>
        </View>

        <OTPTextView
          refs={otpInput}
          tintColor={colors.primary}
          offTintColor={colors.grayBackground}
          inputCount={6}
          textInputStyle={styles.digitField}
          containerStyle={styles.inputContainer}
          handleTextChange={handleChange}
          autoFocus
          inputCellLength={1}
        />

        <View style={styles.resendContainer}>
          {resendCounter < 3 ? (
            timer === 0 ? (
              <Pressable onPress={handleResend} disabled={loading}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </Pressable>
            ) : (
              <Text style={styles.timerText}>
                Resend OTP in {String(Math.floor(timer / 60)).padStart(2, '0')}:
                {String(timer % 60).padStart(2, '0')}
              </Text>
            )
          ) : (
            <Text style={styles.limitText}>
              Too many attempts. Please try again later.
            </Text>
          )}
        </View>

        <CustomButton
          title={'Verify'}
          onPress={handleVerify}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  motto: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  heading: {
    fontFamily: 'Urbainst',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'start',
    color: colors.darkText,
  },
  subHeading: {
    fontFamily: 'Urbainst',
    fontSize: 20,
    fontWeight: '500',
    color: colors.lightText,
    textAlign: 'start',
  },
  digitField: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: colors.primary,
    backgroundColor: colors.grayBackground,
    height: 50,
    width: 50,
  },
  inputContainer: {
    marginVertical: 20,
    width: '100%',
    justifyContent: 'center',
  },
  resendContainer: {
    alignSelf: 'flex-end',
    marginTop: 0,
  },
  resendText: {
    color: colors.primary,
    fontSize: 16,
  },
  timerText: {
    color: colors.lightText,
    fontSize: 16,
  },
  limitText: {
    color: colors.darkText,
    fontSize: 16,
  },
  safeArea: {
    flex: 1,
  },
});
