/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {Link, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {useUser} from '../../context/userContext';
import {useAuth} from '../../context/authenticationContext';
import {VERIFICATION_TYPES} from '../../constants/verificationTypes';
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
  // console.log(width, height);
  const {login} = useAuth();
  const [loading, setLoading] = useState(false);

  GoogleSignin.configure({
    androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    offlineAccess: false,
    scopes: ['profile', 'email'],
  });
  async function googleSignIn(e) {
    e.preventDefault();
    console.log('Google Sign In');

    try {
      setLoading(true);
      // Check if Google Play Services are available
      await GoogleSignin.hasPlayServices();
      // Sign in the user
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data.idToken; // Get the ID token
      console.log('ID Token:', idToken);
      if (!idToken) {
        console.error('ID Token is missing!');
        return;
      }
      console.log('User Info:');
      // console.log(JSON.stringify(userInfo));

      // If email is valid, navigate to the next screen, otherwise sign out
      console.log('email:', userInfo.data.user.email);
      if (userInfo.data.user.email.includes('@kgpian.iitkgp.ac.in')) {
        // Sending the idToken to  backend for verification
        console.log('api url is : ', process.env.API_URL);

        const response = await fetch(
          process.env.API_URL + '/auth/v2/login/google',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({idToken}),
          },
        );
        const result = await response.json();
        console.log('result is : ', result);
        if (result.isSuccess) {
          ToastAndroid.show('Logged in successfully', ToastAndroid.LONG);
          login(result.data);
          navigation.navigate('App', {
            screen: 'TabNavigator',
            params: {screen: 'Home'},
          });
        } else {
          ToastAndroid.show(result.message, ToastAndroid.LONG);
          await GoogleSignin.signOut();
        }
      } else {
        ToastAndroid.show(
          'Please sign in with your IIT Kharagpur email',
          ToastAndroid.LONG,
        );
        await GoogleSignin.signOut();
        console.log('Signed out');
      }
    } catch (error) {
      console.log('ERROR IS: ' + error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(data) {
    console.log(data);
    const {email, password} = data;
    try {
      setLoading(true);
      const response = await fetch(
        process.env.API_URL + '/auth/v2/login/password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: email, password: password}),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.isSuccess) {
        ToastAndroid.show('Logged in successfully', ToastAndroid.LONG);
      } else {
        ToastAndroid.show(result.message, ToastAndroid.LONG);
      }
    } catch (err) {
      console.log('ERROR IS ', err);
    } finally {
      setLoading(false);
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
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Enter a valid email address',
                  },
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
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
                onPress={handleSubmit(handleLogin)}
                loading={loading}
                disabled={loading}
              />
            <View style={styles.thirdParty}>
              <View style={styles.line}>
                <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
                <Text style={styles.loginWith}>Or Login with</Text>
                <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
              </View>
              <View style={styles.buttons}>
                {/* <LogoButton
                    source={require('../../../assets/facebook_icon.png')}
                    onPress={() => {}}
                  /> */}
                <LogoButton
                  source={require('../../../assets/google_icon.png')}
                  onPress={e => googleSignIn(e)}
                />
                {/* <LogoButton
                    source={require('../../../assets/apple_icon.png')}
                    onPress={() => {}}
                  /> */}
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
    flex: 1,
    width: width,
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
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
    marginTop: 5,
    color: 'black',
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
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
    justifyContent: 'center',
    marginVertical: 10,
  },
  heading: {
    fontSize: 25,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 17,
    color: colors.gray,
    textAlign: 'left',
  },
});


export default LoginScreen;
