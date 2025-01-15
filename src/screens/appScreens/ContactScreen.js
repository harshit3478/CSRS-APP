import React, { useState, useEffect } from 'react';
import { StatusBar, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../utils/colors';
import HeaderSection from '../../components/HeaderSection';
import Contact from '../../components/Contact';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import ContactService from '../../utils/ContactService';
import { useAuth } from '../../context/authenticationContext';
import Config from 'react-native-config';

const ContactScreen = () => {
  const API_URL = Config.API_URL;
  const navigation = useNavigation();
  const {user} = useAuth();
  const userID = user.data.id;
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function FetchContacts (){
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/contacts/v1/get`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: userID}),
      });
      const result = await response.json();
      console.log("response of fetch contacts api" , result);
      if (response.ok) {
        const FetchedContacts = result.data;
        setContacts(FetchedContacts);      
      } else {
        console.log('Error getting contacts:', result.message);
        ToastAndroid.show(
          'Error getting contacts: ' + result.message,
          ToastAndroid.LONG,
        );
      }
    } catch (error) {
      console.log('Error getting contacts:', error);
      ToastAndroid.show(
        'Error getting contacts: ' + error.message,
        ToastAndroid.LONG,
      );
    }finally{
      setLoading(false);
    }
  }

// fetch contacts from server when the component mounts 
useEffect(() => {
  FetchContacts();   
  }, []);

  const handleDeleteContact = (id, phone , removeContact) => {
    ContactService.deleteContactAPI(userID, id, phone, removeContact)
      .then(() => {

      })
      .catch(error => {
      console.error("Failed to delete contact:", error);
      });
    
  };

  if(loading){
    return (
      <ActivityIndicator size="large" color={colors.primary} style={{flex:1, justifyContent:'center', alignItems:'center'}}/>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <HeaderSection>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <BackButton />
          <Text style={{ marginLeft: 10, color: 'white', fontSize: 18, fontWeight: 'bold' }} className="font-urbanist-extrabold">
            Contacts
          </Text>
        </View>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => navigation.navigate('AddContact')}
        >
          <Icon name="plus" size={20} color="white" />
          <Text style={{ color: 'white', fontSize: 16, marginLeft: 5 }} className="font-urbanist-extrabold">
            Add contact
          </Text>
        </TouchableOpacity>
      </HeaderSection>
      <View style={{ padding: 10 }}>
        {contacts.length === 0 ? (
          <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>
            No contacts to display
          </Text>
        ) : (
          <FlatList
            data={contacts}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <Contact
                id={item._id}
                name={item.name}
                phone={item.phone}
                onDeleteContact={(id, phone) => handleDeleteContact(id, phone, removeContact)}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ContactScreen;
