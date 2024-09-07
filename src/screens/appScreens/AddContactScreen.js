import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Pressable, StatusBar, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Avatar} from '../../components/Avatar';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import HeaderSection from '../../components/HeaderSection';
import colors from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';

export default function AddContactScreen() {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = image => {
    setSelectedImage(image);
    console.log('Selected Image:', image);
  };
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <HeaderSection>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="white" />
            </Pressable>
            <Text
              style={{
                marginLeft: 10,
                color: 'white',
                fontSize: 24,
                fontWeight: 'semibold',
                fontFamily: 'Urbanist',
              }}
              className="font-urbanist-extrabold">
              Add contact
            </Text>
          </View>
        </HeaderSection>
        <View style={{padding: 10}}>
            <View className="w-[140] h-[140] rounded-full bg-white mx-auto my-5 justify-center items-center " style={{elevation: 10}}>
          <Avatar
            source={
              selectedImage
                ? {uri: selectedImage.path}
                : require('../../../assets/profile.png')
            } 
            onChange={handleImageChange}
          />
            </View>
          <CustomInput
            control={control}
            name={'name'}
            placeholder={'Name'}
            rules={{
              required: true,
            }}
          />
          <CustomInput
            control={control}
            name={'phone'}
            placeholder={'Phone'}
            rules={{required: true, pattern: /^[0-9]/}}
          />
          <CustomInput
            control={control}
            name={'email'}
            placeholder={'Email'}
            rules={{
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            }}
          />
          <View className="flex-row w-full  justify-around">
            <View className="flex-1 pr-5">
              <CustomButton
                onPress={() => navigation.goBack()}
                title="Cancel"
                type="OUTLINED"
              />
            </View>
            <View className="flex-1 ">
              <CustomButton
                onPress={handleSubmit(data => console.log(data))}
                title="Save"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
