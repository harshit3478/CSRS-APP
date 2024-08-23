/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image} from 'react-native';
import CustomButton from './CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function AuthSuccess({title, subText, btnText, onPress}) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center flex p-10 bg-white">
        <Image
          className="w-52 h-52 bg-white"
          source={require('../../assets/success.png')}
        />
        <View className=" w-full items-center  gap-3 ">
          <Text className="font-bold text-[33px] text-center text-black w-full">
            {title}
          </Text>
          <Text className="font-light text-2xl  px-3 text-center font-['urbainst'] mb-10 ">
            {subText}
          </Text>
        </View>
        <View className="w-full m-0 p-0">
          <CustomButton title={btnText} onPress={onPress} />
        </View>
      </View>
    </SafeAreaView>
  );
}
