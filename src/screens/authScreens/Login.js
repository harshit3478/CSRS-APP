/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import {Link, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import colors from '../../utils/colors';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import LogoButton from '../../components/LogoButton';
import BottomSection from '../../components/BottomSection';
import BackButton from '../../components/BackButton';
const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  console.log(width, height);

  GoogleSignin.configure({
    androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    offlineAccess: false, // If you need serverAuthCode for server-side token exchange
    scopes: ['profile', 'email'], // Request access to profile and email
  });
  async function googleSignIn(e) {
    e.preventDefault();
    console.log('Google Sign In');
  
    try {
      // Check if Google Play Services are available
      await GoogleSignin.hasPlayServices();
      // Sign in the user
      await GoogleSignin.signOut()
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      const idToken = userInfo.data.idToken; // Get the ID token
  
      if (!idToken) {
        console.error('ID Token is missing!');
        return;
      }
  
      console.log(JSON.stringify(userInfo));
  
      // If email is valid, navigate to the next screen, otherwise sign out
      if (userInfo.data.user.email.includes('@kgpian.iitkgp.ac.in')) {
        // Sending the idToken to  backend for verification
        // await verifyIdToken(idToken);
        navigation.navigate('register');
      } else {
        console.log('Email is not valid');
        await GoogleSignin.signOut();
        console.log('Signed out');
      }
    } catch (error) {
      console.log('ERROR IS: ' + JSON.stringify(error));
    }
  }
  async function verifyIdToken(idToken) {
    try {
      const url = process.env.API_URL
      const response = await fetch(`${url}/login/idToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Token verification failed');
      }
  
      console.log('Token verified successfully:', data);
    } catch (error) {
      console.error('Error verifying ID Token:', error);
    }
  }
  return (
    <>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <BackButton />

            <View style={styles.motto}>
              <Text style={styles.heading}>Welcome back!</Text>
              <Text style={styles.subHeading}>Login to get started</Text>
            </View>

            <View style={styles.form}>
              <CustomInput
                control={control}
                name="email"
                rules={{required: 'Email is required'}}
                placeholder="Enter your email"
              />
              <CustomInput
                control={control}
                name="password"
                rules={{required: 'Password is required'}}
                placeholder="Enter your password"
                secureTextEntry={true}
              />
              <Link style={styles.forgot} to="/forgotPassword">
                Forgot password?
              </Link>
              <CustomButton
                title="Login"
                onPress={handleSubmit(data => {
                  console.log(data);
                  navigation.navigate('Home');
                })}
              />

              <View style={styles.thirdParty}>
                <View style={styles.line}>
                  <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
                  <Text style={styles.loginWith}>Or Login with</Text>
                  <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
                </View>
                <View style={styles.buttons}>
                  <LogoButton
                    source={require('../../../assets/facebook_icon.png')}
                    onPress={() => {}}
                  />
                  <LogoButton
                    source={require('../../../assets/google_icon.png')}
                    onPress={(e) => googleSignIn(e)}
                  />
                  <LogoButton
                    source={require('../../../assets/apple_icon.png')}
                    onPress={() => {}}
                  />
                </View>
              </View>
            </View>
            <BottomSection
              des="Don't have an account?"
              linkText="Register Now"
              linkPath="/register"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    // justifyContent: 'center',
  },
  form: {
    width: '100%',
    marginVertical: 20,
  },
  motto: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  forgot: {
    alignSelf: 'flex-end',
    hover: {
      color: 'red',
    },
    cursor: 'pointer',
    color: 'black',
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
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
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginVertical: 10,
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

export default LoginScreen;
