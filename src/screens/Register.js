/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';

import CustomInput from '../components/CustomInput';
import {Avatar} from '../components/Avatar';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import LogoButton from '../components/LogoButton';
import BottomSection from '../components/BottomSection';
import colors from '../utils/colors';

const RegisterScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();

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
                name="email"
                rules={{required: 'Email is required'}}
                placeholder="Institute Email"
              />
              <CustomInput
                control={control}
                name="rollno"
                rules={{required: 'Roll No is required'}}
                placeholder="Roll No"
              />
              <CustomInput
                control={control}
                name="password"
                rules={{required: 'Password is required'}}
                placeholder="Password"
                secureTextEntry={true}
              />
              <CustomInput
                control={control}
                name="cnfpassword"
                rules={{required: 'Confirm Password is required'}}
                placeholder="Confirm Password"
                secureTextEntry={true}
              />

              <CustomButton
                title="Register"
                onPress={handleSubmit(data => {
                  console.log(data);
                  navigation.navigate('Home');
                })}
              />

              <View style={styles.thirdParty}>
                <View style={styles.line}>
                  <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
                  <Text style={styles.loginWith}>Or Register with</Text>
                  <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
                </View>
                <View style={styles.buttons}>
                  <LogoButton
                    source={require('../../assets/facebook_icon.png')}
                    onPress={() => {}}
                  />
                  <LogoButton
                    source={require('../../assets/google_icon.png')}
                    onPress={() => {}}
                  />
                  <LogoButton
                    source={require('../../assets/apple_icon.png')}
                    onPress={() => {}}
                  />
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
