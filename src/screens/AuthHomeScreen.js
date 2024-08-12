/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../components/CustomInput';

const AuthHomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/securex.png')}
          width={50}
          height={50}
        />

        <View style={styles.buttonsContainer}>
          <CustomButton
            title="Login"
            onPress={() => navigation.navigate('login')}
          />
          <CustomButton
            title="Register"
            onPress={() => navigation.navigate('register')}
            type="OUTLINED"
          />
          <CustomButton
          title="OTP"
          onPress={() => navigation.navigate('otp')}
          />
        </View>
        <View style={styles.motto}>
          <Text style={styles.subline}>An initiative by</Text>
          <Text style={styles.headline}>DATSOL SOLUTIONS</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthHomeScreen;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    gap: 40,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    marginTop: 20,
    gap: 5,
    width: '100%',
  },
  motto: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  headline: {
    fontSize: 25,
    fontWeight: 'semibold',
    color: 'black',
  },
  subline: {
    fontSize: 15,
    color: 'gray',
  },
});
