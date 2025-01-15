import React from 'react';
import {Text, View, Image, Pressable, StatusBar} from 'react-native';
import {useAuth} from '../context/authenticationContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../utils/colors';
import {useNavigation} from '@react-navigation/native';
export default function DrawerBar() {
  const {user, logout} = useAuth();
  const navigation = useNavigation();
  const {email, username, imageUrl, rollNo} = user.data;
  console.log(email, username, imageUrl, rollNo);
  return (
    <>
      <View className="flex-1">
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View className="profile-section flex-row my-3 p-2 items-center justify-evenly border-b border-slate-200">
          <Image
            source={
              imageUrl ? {uri: imageUrl} : require('../../assets/profile.png')
            }
            className="profile-image rounded-full"
            width={50}
            height={50}
          />
          <View className="profile-details mr-6 ml-2 ">
            <Text className="profile-name text-lg text-slate-800">
              {username}
            </Text>
            <Text
              className="profile-email text-md "
              style={{color: colors.primary}}>
              {rollNo}
            </Text>
          </View>
          <Pressable
            className="icon ml-10"
            onPress={() => {
              navigation.navigate('TabNavigator', {screen: 'Profile'});
            }}>
            <Icon name="chevron-right" size={20} color={colors.lightText} />
          </Pressable>
        </View>
        <View className="drawer-section justify-between flex-1 ">
          <View className="drawer-items">
            <View className="drawer-item w-full px-3 ">
              <Pressable
                onPress={() => {}}
                className="flex-row items-center gap-5 my-1">
                <Icon
                  name="phone-alt"
                  className="invert "
                  size={25}
                  color={colors.lightText}
                />
                <Text className="text-lg " style={{color: colors.lightText}}>
                  My last SOS
                </Text>
              </Pressable>
            </View>
            <View className="drawer-item w-full px-3 ">
              <Pressable
                onPress={() => {}}
                className="flex-row items-center gap-5 my-2 ">
                <Icon
                  name="question-circle"
                  className="invert "
                  size={25}
                  color={colors.lightText}
                />
                <Text className="text-lg " style={{color: colors.lightText}}>
                  Help Center
                </Text>
              </Pressable>
            </View>
          </View>
          <View className="logout-button w-full px-3 ">
            <Pressable
              onPress={logout}
              className="flex-row items-center gap-5 my-2 ">
              <Icon
                name="sign-out-alt"
                className="invert text-red-500 "
                size={25}
                color={colors.red}
              />
              <Text
                className="text-lg text-red-500"
                style={{color: colors.red}}>
                Log Out
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}
