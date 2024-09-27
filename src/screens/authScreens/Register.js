/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, ToastAndroid} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';


import CustomInput from '../../components/CustomInput';
import { useUser } from '../../context/userContext';
import {Avatar} from '../../components/Avatar';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import LogoButton from '../../components/LogoButton';
import BottomSection from '../../components/BottomSection';
import colors from '../../utils/colors';
import { VERIFICATION_TYPES } from '../../constants/verificationTypes';

const RegisterScreen = () => {
  const {control, handleSubmit, getValues} = useForm();
  const navigation = useNavigation();
  const [loading , setLoading] = React.useState(false)
  const {updateVerificationDetails , deviceToken } = useUser();
  
  GoogleSignin.configure({
    // androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    offlineAccess: false, // If you need serverAuthCode for server-side token exchange
    scopes: ['profile', 'email'], // Request access to profile and email
  });
  async function googleSignUp(e) {
    e.preventDefault();
    console.log('Google Sign Up');
    try {
      setLoading(true)
     await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log(userInfo)
      const userData = userInfo.data.user
      // console.log(userData)
      if (userData.email.includes('@kgpian.iitkgp.ac.in')) {
        navigation.navigate('registerWithGoogle', {email: userData.email, name: userData.name});
      } else {
        console.log('Email is not valid');
        await GoogleSignin.signOut();
        console.log('Signed out');
        ToastAndroid.show('Please sign in with your IIT Kharagpur email', ToastAndroid.LONG);
      }
    }catch(err){
      console.log("ERROR IS " , err)
    
    }finally{
      setLoading(false)
    }
  }

  async function handleSignUp(data) {
    try{
      setLoading(true)
      // console.log('api url is ' , process.env.API_URL)
      const response = await fetch(process.env.API_URL + "/auth/v1/signup/email", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        ToastAndroid.show('Verification code sent successfully', ToastAndroid.LONG);
      updateVerificationDetails(data , VERIFICATION_TYPES.REGISTER)
      navigation.navigate("otp")
    }else{
      ToastAndroid.show('Error sending verification code : ' + result.message, ToastAndroid.LONG);
    }
  }catch(err){
    console.log("ERROR IS " , err )
  }finally{
    setLoading(false)
  }

  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <BackButton />

            <View style={styles.motto}>
              <Text style={styles.heading}>Hello!</Text>
              <Text style={styles.subHeading}>Register to get started</Text>
            </View>

            <View style={styles.form}>
              <CustomInput
                control={control}
                name="name"
                placeholder="Full Name"
                rules={{
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters long',
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'Name must contain only letters and spaces',
                  },
                }}
              />
              <CustomInput
                control={control}
                name="email"
                placeholder="Institute Email"
                keyboardType="email-address"
                // icon={<Icon>hello</Icon>}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@kgpian\.iitkgp\.ac\.in$/,
                    message: 'Please enter a valid institute email',
                  },
                }}
              />
              <CustomInput
                control={control}
                name="phone"
                placeholder="Phone Number"
                keyboardType="numeric"
                rules={{
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be exactly 10 digits',
                  },
                }}
              />
              <CustomInput
                control={control}
                name="rollno"
                placeholder="Roll No"
                rules={{
                  required: 'Roll No is required',
                  pattern: {
                    value: /^[0-9]{2}[A-Z]{2}[0-9]{5}$/,
                    message: 'Roll No must be in the format YYXX00000 (e.g., 22CE10029)',
                  },
                }}
              />
              <CustomInput
                control={control}
                name="password"
                placeholder="Password"
                secureTextEntry={true}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                    message: 'Password must be strong (include letters, numbers, and special characters)',
                  },
                }}
              />
              <CustomInput
                control={control}
                name="cnfpassword"
                placeholder="Confirm Password"
                secureTextEntry={true}
                rules={{
                  required: 'Confirm Password is required',
                  validate: value =>
                    value === getValues('password') || 'Passwords do not match',
                }}
              />

              <CustomButton
                title="Register"
                onPress={handleSubmit(handleSignUp)}
                loading={loading}
              />

              <View style={styles.thirdParty}>
                <View style={styles.line}>
                  <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
                  <Text style={styles.loginWith}>Or Register with</Text>
                  <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
                </View>
                <View style={styles.buttons}>
                  {/* <LogoButton
                    source={require('../../../assets/facebook_icon.png')}
                    onPress={() => {}}
                  /> */}
                  <LogoButton
                    source={require('../../../assets/google_icon.png')}
                    onPress={(e) => googleSignUp(e)}
                  />
                  {/* <LogoButton
                    source={require('../../../assets/apple_icon.png')}
                    onPress={() => {}}
                  /> */}
                </View>
              </View>
            </View>
          </View>
          <BottomSection
            des="Already have an account?"
            linkText="Login Now"
            linkPath="/login"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  form: {
    marginVertical: 20,
  },
  motto: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 15,
  },
  loginWith: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.gray,
    marginVertical: 25,
    marginHorizontal: 10,
  },
  line: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttons: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    // paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 50,
  },
  heading: {
    fontSize: 25,
    textAlign: 'start',
    color: 'black',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 17,
    color: colors.gray,
    textAlign: 'start',
  },
});
