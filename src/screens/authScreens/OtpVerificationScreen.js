/* eslint-disable prettier/prettier */
import { Text, Button, View, TextInput, StyleSheet } from 'react-native';
import React , { useRef, useState } from 'react';

import colors from '../../utils/colors';
import BackButton from '../../components/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import OTPTextView from 'react-native-otp-textinput';
import CustomButton from '../../components/CustomButton';
import BottomSection from '../../components/BottomSection';

export default function OtpScreen({navigation}) {
  let otpInput = useRef(null);
  const [otp, setOtp] = useState('');
  const handleChange = (code) => {
    setOtp(code);
  };

  // const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>


    <View style={styles.container}>
      <BackButton />

      <View style={styles.motto}>
            <Text style={styles.heading}>Verification Code</Text>
            <Text style={styles.subHeading}>We have sent you a verification code to your email address</Text>
          </View>
    <OTPTextView refs={otpInput}  tintColor={colors.primary} offTintColor={colors.grayBackground} inputCount={4} textInputStyle={styles.digitField} containerStyle={styles.inputContainer} autoFocus defaultValue="" handleTextChange={handleChange} />

    <CustomButton title={'Verify'} onPress={() => navigation.navigate('authSuccess', {title : 'Registration Successful' , subText:'You have been registered successfully' , btnText : 'Get Started' , path: 'login'})} />

    <BottomSection des={"Didn't receive the code?"} linkPath={'Resend'} linkText={'Resend'} />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
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
    fontWeight:'700',
    textAlign: 'start',
    color: colors.darkText,
  },
  subHeading: {
    fontFamily: 'Urbainst',
    fontSize: 20,
    fontWeight:'500',
    color: colors.lightText,
    textAlign: 'start',
  },
  digitField:{
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: colors.primary,
    backgroundColor: colors.grayBackground,
    height: 70,
    width: 80,

  },
  inputContainer:{
    marginVertical: 20,
    width: '100%',
    justifyContent: 'center',

  },
  safeArea: {
    flex: 1,
  },
});
