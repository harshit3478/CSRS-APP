/* eslint-disable prettier/prettier */
import React from 'react';
import {View , Text} from 'react-native';
import AuthSuccess from '../components/AuthSuccess';


export default function AuthSuccessScreen({route, navigation}) {
    const {title , subText , path , btnText} = route.params;
    console.log('rote params' , route.params);
  return (
    <View className="flex-1 ">
     <AuthSuccess title={title} subText={subText} btnText={btnText} onPress={()=>{navigation.navigate(path)}} />
    </View>
  );
}
