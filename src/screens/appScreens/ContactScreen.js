// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, FlatList,StatusBar,TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
// import Contacts from 'react-native-contacts';
// import {SafeAreaView} from 'react-native-safe-area-context';

// import Icon from 'react-native-vector-icons/FontAwesome';
// import colors from '../../utils/colors';
// import HeaderSection from '../../components/HeaderSection';
// import BackButton from '../../components/BackButton';

// const ContactScreen = () => {
//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);

//   // Function to request permission for contacts on Android
//   const requestContactsPermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//         {
//           title: 'Contacts Permission',
//           message: 'This app needs access to your contacts.',
//           buttonPositive: 'OK',
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true; // iOS auto grants permission when added to Info.plist
//   };

//   // Function to load contacts
//   const loadContacts = async () => {
//     try {
//       const permissionGranted = await requestContactsPermission();
//       if (!permissionGranted) {
//         console.warn('Permission to access contacts was denied');
//         return;
//       }

//       Contacts.getAll().then(contacts => {
//         setContacts(contacts);
//       });
//     } catch (error) {
//       console.error('Error fetching contacts', error);
//     }
//   };

//   // Function to select a contact
//   const onSelectContact = (contact) => {
//     const phoneNumbers = contact.phoneNumbers;
//     if (phoneNumbers && phoneNumbers.length > 0) {
//       setSelectedContact({
//         name: contact.displayName,
//         phoneNumber: phoneNumbers[0].number,
//       });
//     } else {
//       console.warn('No phone number available for this contact');
//     }
//   };

//   // Load contacts on mount
//   useEffect(() => {
//     loadContacts();
//   }, []);

//   return (
//   <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
//     <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
//     <HeaderSection>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <BackButton/>
//         <Text style={{marginLeft: 10, color: 'white', fontSize: 18, fontWeight: 'bold' , fontFamily:'Urbanist'}} className="font-urbanist-extrabold">Contacts</Text>
//       </View>
//       <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=> navigator.navigate("AddContact")}>
//         <Icon name="plus" size={20} color="white" />
//         <Text style={{color: 'white', fontSize: 16, marginLeft: 5}} className="font-urbanist-extrabold">Add contact</Text>
//       </TouchableOpacity>
//     </HeaderSection>
//     <Button title="Reload Contacts" onPress={loadContacts} />

//       <FlatList
//         data={contacts}
//         keyExtractor={(item) => item.recordID}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => onSelectContact(item)}>
//             <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
//               <Text style={{ fontSize: 16 }}>{item.displayName}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />

//       {selectedContact && (
//         <View style={{ marginTop: 20 }}>
//           <Text>Selected Contact:</Text>
//           <Text>Name: {selectedContact.name}</Text>
//           <Text>Phone: {selectedContact.phoneNumber}</Text>
//         </View>
//       )}

//     </SafeAreaView>
//   );
// };

// export default ContactScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, PermissionsAndroid, Platform, Image } from 'react-native';
import Contacts from 'react-native-contacts';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../utils/colors'; // Assume you have this color utility
import HeaderSection from '../../components/HeaderSection'; // Your custom header
import BackButton from '../../components/BackButton'; // Your back button component

const ContactScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  // Request contact permissions
  const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app needs access to your contacts.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // Load contacts and filter based on search text
  const loadContacts = async () => {
    try {
      const permissionGranted = await requestContactsPermission();
      if (!permissionGranted) {
        console.warn('Permission to access contacts was denied');
        return;
      }
      Contacts.getAll().then((contacts) => {
        setContacts(contacts);
        setFilteredContacts(contacts); // Initially, display all contacts
      });
    } catch (error) {
      console.error('Error fetching contacts', error);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const onSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = contacts.filter((contact) =>
        contact?.displayName?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts); // Show all if search is cleared
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.contactContainer}>
      {/* Display image placeholder */}
      <Image
        source={{ uri: item.thumbnailPath || 'https://via.placeholder.com/150' }}
        style={styles.contactImage}
      />
      <View style={styles.contactDetails}>
        <Text style={styles.contactName}>{item.displayName}</Text>
        {item.phoneNumbers.length > 0 && (
          <Text style={styles.contactPhone}>{item.phoneNumbers[0].number}</Text>
        )}
      </View>
      <Icon name="phone" size={24} color={colors.primary} style={styles.callIcon} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderSection>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <BackButton />
          <Text style={styles.headerTitle}>Contacts</Text>
        </View>
        <TouchableOpacity style={styles.addContactButton}>
          <Icon name="plus" size={20} color="white" />
          <Text style={styles.addContactText}>Add contact</Text>
        </TouchableOpacity>
      </HeaderSection>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor={colors.lightText}
          value={searchText}
          onChangeText={onSearch}
        />
        <Icon name="search" size={20} color={colors.primary} style={styles.searchIcon} />
      </View>

      {/* Contact List */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.recordID}
        renderItem={renderItem}
        contentContainerStyle={styles.contactList}
      />
    </SafeAreaView>
  );
};

const styles = {
  headerTitle: {
    marginLeft: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Urbanist', // Custom font, make sure it's loaded
  },
  addContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addContactText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
    fontFamily: 'Urbanist',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    margin: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  searchIcon: {
    marginLeft: 10,
  },
  contactList: {
    paddingBottom: 80, // Extra padding for bottom nav (if present)
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  contactPhone: {
    fontSize: 14,
    color: colors.lightText,
  },
  callIcon: {
    paddingLeft: 10,
  },
};

export default ContactScreen;
