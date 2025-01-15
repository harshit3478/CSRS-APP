import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../utils/colors';
import {useAuth} from '../context/authenticationContext';
import {useUser} from '../context/userContext';
import Config from 'react-native-config';
import { set } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';


const Contact = ({id, name, phone}) => {
  const API_URL = Config.API_URL;
  const {removeContact} = useUser();
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

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

  async function DeleteContact(id) {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/contacts/v1/delete`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id}),
      });
      const result = await response.json();
      console.log('result of delete contact api request ', result);
      if (response.ok) {
        ToastAndroid.show('Contact deleted successfully', ToastAndroid.LONG);
        //reload the route
        navigation.replace('TabNavigator', {screen: 'Contacts'});
      } else {
        console.log('Error:', result.message);
        ToastAndroid.show('Error: ' + result.message, ToastAndroid.LONG);
      }
    } catch (error) {
      console.log('Error deleting contact:', error);
      ToastAndroid.show('Error: ' + error.message, ToastAndroid.LONG);
    }finally{
      setLoading(false);
    }
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
            onPress: () => DeleteContact(id),
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
      <View style={{flex: 1}}>
        {/* max 1 line should be allowed to avoid overflow or max of 25 chars */}
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
          {name}
        </Text>
        <Text style={{fontSize: 14, color: 'gray', color: colors.lightText}}>
          {phone}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',
          gap: 10,
        }}>
        <TouchableOpacity onPress={handleCall} className="bg-blue-60">
          <Icon name="phone" size={30} color={colors.primary} />
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size={20} color={'blue'} />
        ) : (
          <TouchableOpacity
            onPress={handleDelete}
            style={{marginLeft: 10}}
            className="bg-blue-60">
            <Icon name="trash" size={30} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Contact;
