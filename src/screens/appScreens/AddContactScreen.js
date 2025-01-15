/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, Component, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StatusBar,
  Text,
  View,
  Platform,
  PermissionsAndroid,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Contacts from 'react-native-contacts';
import BackButton from '../../components/BackButton';
import ContactListTile from '../../components/ContactListTile';
import colors from '../../utils/colors';
import HeaderSection from '../../components/HeaderSection';
import ContactService from '../../utils/ContactService';
import { useAuth } from '../../context/authenticationContext';
import { useUser } from '../../context/userContext';
import { useNavigation } from '@react-navigation/native';

export default function AddContactScreen() {
  const [contacts, setContacts] = useState([]);
  const isInitialRender = useRef(true);
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();
  const {addContact} = useUser();
  const navigation = useNavigation();
  const id = user.data.id
  async function handleAddContact( name, phone) {
    try {
      setLoading(true);
      // show alert to confirm adding contact
       Alert.alert(
        'Add Contact',
        `Do you want to add ${name} to your contacts?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => ContactService.addContactAPI(id, name, phone  , addContact , navigation)
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.log('Error adding contact : ', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (isInitialRender.current) {
      async function componentDidMount() {
        if (Platform.OS === 'android') {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts',
              message: 'This app would like to view your contacts.',
            },
          ).then(() => {
            loadContacts();
          });
        } else {
          this.loadContacts();
        }
      }
      componentDidMount();
      isInitialRender.current = false;
    }
  });

  function search(text) {
    setLoading(true);
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === '' || text === null) {
      loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then(contactlist => {
        const temp = contactlist
          .filter(
            item =>
              item.displayName &&
              item.phoneNumbers &&
              item.phoneNumbers.length > 0,
          )
          .map(item => ({
            name: item.displayName,
            phone: item.phoneNumbers[0].number,
            image: item.thumbnailPath,
          }));
        setContacts(temp);
      });
    } else if (emailAddressRegex.test(text)) {
      Contacts.getContactsByEmailAddress(text).then(contactlist => {
        const temp = contactlist
          .filter(
            item =>
              item.displayName &&
              item.phoneNumbers &&
              item.phoneNumbers.length > 0,
          )
          .map(item => ({
            name: item.displayName,
            phone: item.phoneNumbers[0].number,
            image: item.thumbnailPath,
          }));
        setContacts(temp);
      });
    } else {
      Contacts.getContactsMatchingString(text).then(contactlist => {
        const temp = contactlist
          .filter(
            item =>
              item.displayName &&
              item.phoneNumbers &&
              item.phoneNumbers.length > 0,
          )
          .map(item => ({
            name: item.displayName,
            phone: item.phoneNumbers[0].number,
            image: item.thumbnailPath,
          }));
        setContacts(temp);
      });
    }
    setLoading(false);
  }

  function loadContacts() {
    setLoading(true);
    Contacts.getAll()
      .then(contactlist => {
        const temp = contactlist
          .filter(
            item =>
              item.displayName &&
              item.phoneNumbers &&
              item.phoneNumbers.length > 0,
          )
          .map(item => ({
            name: item.displayName,
            phone: item.phoneNumbers[0].number,
            image: item.thumbnailPath,
          }));
        setContacts(temp);
      })
      .catch(e => {
        console.error('Contact error: ', e);
      })
      .finally(() => {
        console.log('Contacts loaded');
        setLoading(false);
      });

    Contacts.getCount().then(count => {
      console.log('Contact count: ', count);
    });

    Contacts.checkPermission();
  }

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <HeaderSection>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <BackButton />
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
          {/* <SearchBar searchPlaceholder="Search" onChangeText={search} /> */}
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.secondary,
              borderRadius: 25,
              paddingHorizontal: 15,
              height: 40,
              marginBottom: 10,
              color: colors.darkText,
            }}
            placeholder="Search..."
            onChangeText={search}
            placeholderTextColor={colors.lightText}
          />
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <FlatList
              data={contacts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    handleAddContact(item.name, item.phone)
                  }>
                  <ContactListTile
                    name={item.name}
                    phone={item.phone}
                    image={item.image}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
