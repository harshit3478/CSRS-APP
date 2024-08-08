/* eslint-disable prettier/prettier */
import {StyleSheet, Text, ToastAndroid, View, Alert, Button} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {useForm} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
const SignInScreen = () => {
  const {control, handleSubmit} = useForm();
  const [isEmail, SetisEmail] = useState(true);
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <Text style={styles.heading}>SignInScreen</Text>
      
      {isEmail ? (
        <CustomInput
          name={'email'}
          control={control}
          placeholder="Email"
          secureTextEntry={false}
        />
      ) : (
        <CustomInput
          name={'phone'}
          control={control}
          placeholder="Phone"
          secureTextEntry={false}
        />
      )}
      <CustomButton
        bgColor={'skyblue'}
        fgColor={'#000'}
        text="Sign In"
        onPress={() => ToastAndroid.show('done', ToastAndroid.SHORT)}
      />
      <CustomButton
        bgColor={'white'}
        fgColor={'black'}
        text="Sign Up"
        type={'SECONDARY'}
        onPress={() =>{
          ToastAndroid.showWithGravity(
            'Sign Up',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          // navigation.navigate('SignUpScreen');
          navigation.navigate('SignUpScreen');
        }
        }
      />
      <CustomButton
        bgColor={'white'}
        fgColor={'black'}
        text="Forgot Password"
        type={'SECONDARY'}
        onPress={() =>
          Alert.alert('Forgot Password', 'Forgot Password', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ])
        }
      />
      <Button title={'Login with ' + (isEmail ? 'Phone' : 'Email')} onPress={() => SetisEmail(!isEmail)} />

    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'powderblue',
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
});

export default SignInScreen;

