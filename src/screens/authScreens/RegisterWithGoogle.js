/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';

import { useAuth } from '../../context/authenticationContext';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import colors from '../../utils/colors';

const RegisterWithGoogleScreen = ({route}) => {
  const {control, handleSubmit, register, getValues} = useForm();
  const navigation = useNavigation();
  const {email, name} = route.params;
  const [loading, setLoading] = React.useState(false);
  const {login} = useAuth();
  async function handleRegister(data) {
    console.log(data);
    const {name, email, phone, rollno, password} = data;
    try {
      setLoading(true);
      console.log('Registering');
      console.log(name, email, phone, rollno, password);
      const response = await fetch(process.env.API_URL + '/auth/v2/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          rollNo:rollno,
          password,
          deviceToken: '1234',
        }),
      });
      const res = await response.json();
      console.log(res);
      if (res.isSuccess) {
        ToastAndroid.show('Registration Successful', ToastAndroid.LONG);
        login(res.data);
        navigation.navigate("App" , {screen: "TabNavigator", params: {screen: "Profile"}})
      } else {
        ToastAndroid.show('Registration Failed', ToastAndroid.LONG);
      }
    } catch (err) {
      console.log('signup error is:', err);
    } finally {
      setLoading(false);
    }
  }
  // get the value of email from control and set it to the email field

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <BackButton />

            <View style={styles.motto}>
              <Text style={styles.heading}>Hello! {name}</Text>
              <Text style={styles.subHeading}>
                Fill in the details to get Started!
              </Text>
            </View>

            <View style={styles.form}>
              <CustomInput
                control={control}
                name="name"
                placeholder="Full Name"
                defaultValue={name}
              />
              <CustomInput
                control={control}
                name="email"
                placeholder="Institute Email"
                keyboardType="email-address"
                disabled={true}
                defaultValue={email}
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
                    message:
                      'Roll No must be in the format YYXX00000 (e.g., 22CE10029)',
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
                    message:
                      'Password must be strong (include letters, numbers, and special characters)',
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
                onPress={handleSubmit(handleRegister)}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterWithGoogleScreen;

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
    paddingHorizontal: 20,
    justifyContent: 'space-between',
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
