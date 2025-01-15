// src/context/UserContext.js

import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [verificationDetails, setVerificationDetails] = useState(null);
  const [verificationType, setVerificationType] = useState(null);
  const [deviceToken , setDeviceToken] = useState(null);
  const [contacts , setContacts ] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        // await AsyncStorage.removeItem('contacts');
        const storedContacts = await AsyncStorage.getItem('contacts');
        if (storedContacts) {
          setContacts(JSON.parse(storedContacts));
        }
      } catch (error) {
        console.error('Error loading contacts', error);
      }
    };
    loadContacts();
  }, []);

  const addContact = async (contact) => {
    try {
      const updatedContacts = [...contacts, contact];
      setContacts(updatedContacts);
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
    } catch (error) {
      console.error('Error storing contacts', error);
    }
  };

  const removeContact = async (id) => {
    try {
      console.log('id is : ' , id);
      console.log('contacts are : ' , contacts);
      const updatedContacts = contacts.filter((c) => c.id !== id);
      setContacts(updatedContacts);
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
      console.log('updated contacts', updatedContacts);
    } catch (error) {
      console.error('Error storing contacts', error);
    }
  };

  const clearContacts = async () => {
    try {
      await AsyncStorage.removeItem('contacts');
      setContacts([]);
    } catch (error) {
      console.error('Error clearing contacts', error);
    }
  };

  const updateVerificationDetails = (details, type) => {
    setVerificationDetails(details);
    setVerificationType(type);
  };

  const updateDeviceToken = (token) => {
    setDeviceToken(token);
  };

  const clearDeviceToken = () => {
    setDeviceToken(null);
  };

  const clearVerificationDetails = () => {
    setVerificationDetails(null);
    setVerificationType(null);
  };

  return (
    <UserContext.Provider value={{
      verificationDetails, 
      verificationType,
      deviceToken,
      contacts, 
      addContact, 
      removeContact, 
      clearContacts, 
      updateDeviceToken, 
      updateVerificationDetails, 
      clearVerificationDetails
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
