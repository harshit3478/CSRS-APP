import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../utils/colors';
import ContactService from '../utils/ContactService';
import {useAuth} from '../context/authenticationContext';
import {useUser} from '../context/userContext';

const Contact = ({id, image, name, phone , onDeleteContact}) => {

  const {removeContact} = useUser();
  const [loading, setLoading] = React.useState(false);

  function handleCall() {
    const phoneNumber = `tel:${phone}`;
    console.log('Phone number:', phoneNumber);
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (supported) {
          Linking.openURL(phoneNumber); // Opens the phone's dialer
        } else {
          Alert.alert('Phone number is not available or invalid.');
        }
      })
      .catch(err => console.error('Error opening dialer', err));
  }

  async function handleDelete() {
    try {
      setLoading(true);
      Alert.alert(
        'Delete Contact',
        'Are you sure you want to delete this contact?',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete',
            onPress: () => onDeleteContact(id , phone , removeContact),
          },
        ],
        {cancelable: true},
      );
    } catch (error) {
      console.log('Error deleting contact : ', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        <Text style={{fontSize: 14, color: 'gray', color: colors.lightText}}>
          {phone}
        </Text>
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 10,
      }}>
        <TouchableOpacity onPress={handleCall} className="bg-blue-60" >
          <Icon name="phone" size={30} color={colors.primary} />
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size={20} color={'blue'} />
        ) : (
          <TouchableOpacity onPress={handleDelete} style={{marginLeft: 10}} className="bg-blue-60" >
            <Icon name="trash" size={30} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Contact;
