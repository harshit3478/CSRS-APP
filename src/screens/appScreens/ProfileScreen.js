import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Image, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../utils/colors';
import { useAuth } from '../../context/authenticationContext';
import {Avatar} from '../../components/Avatar';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = React.useState(null);
  const {user,logout} = useAuth();
  const {email, phone, hall, address, username , rollNo, imageUrl } = user.data;

  const detailCard = ({title, value}) => {
    return (
      <View className="flex-row justify-between items-start  my-3 gap-10">
        <Text className="text-lg font-urbanist-medium text-slate-900 ">{title}</Text>
        <Text className="text-lg font-urbanist-black text-slate-700 flex-1 text-left">{value}</Text>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <HeaderSection>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <BackButton/>
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
            onPress={() => navigation.navigate('EditProfile', {params : {title : 'Edit Profile'}})}>
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
              <Image style={styles.avatar} source={imageUrl? {uri: imageUrl} : require('../../../assets/profile.png')} />
            </View>
            <Text className="text-3xl text-urbanist-extrabold text-black ">
              {username}
            </Text>
            <Text
              className="text-xl font-urbanist-medium"
              style={{color: colors.primary}}>
              {rollNo}
            </Text>
          </View>
          <View className="details-section p-5">
            {detailCard({title: 'Email', value: email})}
            {detailCard({title: 'Phone', value: phone})}
            {detailCard({title: 'Hall', value: hall})}

            {/* line between  */}
            <View className="w-full h-1 border-b border-gray-400 my-5"></View>
                
            {detailCard({title: 'Address', value: address})}

          </View>
          <Button title="Logout" onPress={logout} style="bg-red-500" />

        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 120,
    width: 120,
    borderRadius: 100,
    padding: 20,
  },
})