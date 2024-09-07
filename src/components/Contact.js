import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../utils/colors';

const Contact = ({image, name, phone}) => {
    function handleCall() {
        // call to the phone number open phone's system dialer
        RNImmediatePhoneCall.immediatePhoneCall(phone);


    }
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15}}>
      <Image
        source={{uri: image}}
        style={{width: 60, height: 60, borderRadius: 30, marginRight: 15 , backgroundColor: colors.lightText}}
      />
      <View style={{flex: 1}}>
        {/* max 1 line should be allowed to avoid overflow or max of 25 chars */}
        <Text style={{fontSize: 16, fontWeight: 'bold' , color: 'black'}}  >{name}</Text>
        <Text style={{fontSize: 14, color: 'gray', color: colors.lightText}}>{phone}</Text>
      </View>
      <TouchableOpacity onPress={handleCall}>
        <Icon name="phone" size={30} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default Contact;
