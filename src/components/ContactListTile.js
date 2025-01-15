/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../utils/colors';

export default function ContactListTile({image, name, phone}) {
  // console.log('ContactListTile:', image, name, phone);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
      }}>
      <Image
        source={image ? {uri: image} : require('../../assets/profile.png')}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          marginRight: 15,
          backgroundColor: colors.white,
        }}
      />
      <View style={{flex: 1}}>
        {/* max 1 line should be allowed to avoid overflow or max of 25 chars */}
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
          {name}
        </Text>
        <Text style={{fontSize: 14, color: colors.lightText}}>{phone}</Text>
      </View>
    </View>
  );
}
