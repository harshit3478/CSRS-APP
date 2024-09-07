import React from 'react'
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../utils/colors';
import {Avatar} from '../../components/Avatar';
import HeaderSection from '../../components/HeaderSection';
export default function EditProfile() {
    return (
    <>
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <HeaderSection>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="chevron-left" size={20} color="white" />
          <Text style={{marginLeft: 10, color: 'white', fontSize: 18, fontWeight: 'bold' , fontFamily:'Urbanist'}} className="font-urbanist-extrabold">Profile</Text>
        </View>
        </HeaderSection>
        <View style={{padding: 10}}>
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
        </View>
      </SafeAreaView>
    </>
    )
}