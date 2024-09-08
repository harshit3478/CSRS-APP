import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../utils/colors';
import {Avatar} from '../../components/Avatar';
import HeaderSection from '../../components/HeaderSection';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleImageChange = image => {
    setSelectedImage(image);
    console.log('Selected Image:', image);
  };
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <HeaderSection>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={20} color="white" />
            </Pressable>
            <Text
              style={{
                marginLeft: 10,
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Urbanist',
              }}
              className="font-urbanist-extrabold">
              Profile
            </Text>
          </View>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => navigation.navigate('EditProfile')}>
            <Icon name="pencil" size={20} color="white" />
            <Text
              style={{color: 'white', fontSize: 16, marginLeft: 5}}
              className="font-urbanist-extrabold">
              Edit profile
            </Text>
          </TouchableOpacity>
        </HeaderSection>
        <View style={{padding: 10}}>
          <View className="profile-section items-center">
            <View
              className="w-[140] h-[140] rounded-full bg-white mx-auto my-5 justify-center items-center "
              style={{elevation: 10}}>
              <Avatar
                source={
                  selectedImage
                    ? {uri: selectedImage.path}
                    : require('../../../assets/profile.png')
                }
                onChange={handleImageChange}
              />
            </View>
            <Text className="text-3xl text-urbanist-extrabold text-black ">
              Shreya Singh
            </Text>
            <Text
              className="text-xl font-urbanist-medium"
              style={{color: colors.primary}}>
              22CS10099
            </Text>
          </View>
          <View className="details-section p-5">
            <View className="flex-row justify-between items-center my-3">
              <Text className="text-lg text-urbanist-black-italic  w-1/2">Email</Text>
              <Text className="text-lg font-urbanist-medium text-black w-1/2 text-left">shreya@gmail.com</Text>
            </View>
            <View className="flex-row justify-between items-center my-3">
              <Text className="text-lg font-urbanist-medium w-1/2">Phone</Text>
              <Text className="text-lg font-urbanist-black text-black w-1/2 text-left">+91 9876543210</Text>
            </View>
            <View className="flex-row justify-between items-center my-3">
              <Text className="text-lg font-urbanist-medium w-1/2">Hall</Text>
              <Text className="text-lg font-urbanist-black text-black w-1/2 text-left">SNVH</Text>
            </View>

            {/* line between  */}
            <View className="w-full h-1 border-b border-gray-400 my-5"></View>
                
            <View className="flex-row justify-between items-start my-3 ">
              <Text className="text-lg font-urbanist-medium w-1/2">Address</Text>
              <Text className="text-lg font-urbanist-black text-black w-1/2 text-left">A23, Hills Apartment, Nagpur, Maharashtra</Text>
            </View>

          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
