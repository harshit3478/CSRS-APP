// src/context/AuthenticationContext.js

import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log('user', user);
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error loading user data', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const login = async (userData) => {
    try {
      // Assuming userData contains token, email, phone, name, etc.
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData)); // Store all user data
    } catch (error) {
      console.error('Error storing user data', error);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user'); // Clear user data on logout
      // clear the contacts and other data associated with user
      await AsyncStorage.removeItem('contacts');
    } catch (error) {
      console.error('Error clearing user data', error);
    }
  };

  return (
    <AuthenticationContext.Provider value={{user, loading, login, logout}}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => useContext(AuthenticationContext);
