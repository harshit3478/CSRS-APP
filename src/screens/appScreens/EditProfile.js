import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../utils/colors';
import {Avatar} from '../../components/Avatar';
import HeaderSection from '../../components/HeaderSection';
import {useForm} from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = React.useState(null);
  const {control, handleSubmit} = useForm();

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
              Edit profile
            </Text>
          </View>
        </HeaderSection>
        <ScrollView style={{padding: 10}}>
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
            <Text className="text-3xl text-black font-urbanist-extrabold">
              Shreya Singh
            </Text>
            <Text
              className="text-xl font-urbanist-medium"
              style={{color: colors.primary}}>
              22CS10099
            </Text>
            <Text className="text-lg text-gray-800 font-urbanist-medium">
              shreyasingh@kgpian.iitkgp.ac.in
            </Text>
          </View>
          <View className="details-section p-5">
            <CustomInput
              control={control}
              name="name"
              label="Name"
              placeholder="Enter your name"
              keyboardType="text"
            />
            <CustomInput
              control={control}
              name="hall"
              label="Hall"
              placeholder="Hall of Residence"
              keyboardType="text"
            />
            <View className="flex-row justify-between items-center my-4">
              <Text className="text-2xl font-semibold font-urbanist-medium text-black">
                Address
              </Text>
              <View className="flex-1 ml-2 h-.5 border-b border-slate-400"></View>
            </View>
            <CustomInput
              control={control}
              name="address"
              label="Address"
              placeholder="Address Line 1"
              keyboardType="text"
            />
            <CustomInput
              control={control}
              name="state"
              label="State"
              placeholder="State"
              keyboardType="text"
            />
            <CustomInput
              control={control}
              name="city"
              label="City"
              placeholder="City"
              keyboardType="text"
            />
            <CustomInput
              control={control}
              name="pincode"
              label="Pincode"
              placeholder="Pincode"
              keyboardType="number-pad"
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
