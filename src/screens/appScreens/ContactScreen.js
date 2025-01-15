import React, { useState, useEffect } from 'react';
import { StatusBar, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../utils/colors';
import HeaderSection from '../../components/HeaderSection';
import Contact from '../../components/Contact';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import { useUser } from '../../context/userContext';
import ContactService from '../../utils/ContactService';
import { useAuth } from '../../context/authenticationContext';

const ContactScreen = () => {
  const navigation = useNavigation();
  const { contacts, removeContact } = useUser(); // Updated to include contact deletion
  const {user} = useAuth();
  const userID = user.data.id;
  const [filteredContacts, setFilteredContacts] = useState(contacts); // Initial contacts

  const handleDeleteContact = (id, phone , removeContact) => {
    // Remove the contact from the context and filter the state
    // removeContact(id);
    ContactService.deleteContactAPI(userID, id, phone, removeContact)
      .then(() => {
      // removeContact(id);
      // setFilteredContacts(contacts.filter(contact => contact.id !== id));
      })
      .catch(error => {
      console.error("Failed to delete contact:", error);
      });
    
  };

  useEffect(() => {
    // Update filtered contacts when contacts change
    console.log("contacts in contacts screen" , contacts)
    setFilteredContacts(contacts);
  }, [contacts]);

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
        {filteredContacts.length === 0 ? (
          <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>
            No contacts to display
          </Text>
        ) : (
          <FlatList
            data={filteredContacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Contact
                id={item.id}
                name={item.name}
                phone={item.phone}
                image={item.image}
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
