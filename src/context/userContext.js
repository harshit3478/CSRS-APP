// src/context/UserContext.js

import React, {createContext, useState, useContext} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [verificationDetails, setVerificationDetails] = useState(null);
  const [verificationType, setVerificationType] = useState(null);
  const [deviceToken , setDeviceToken] = useState(null);
  const updateVerificationDetails = (details, type) => {
    setVerificationDetails(details);
    setVerificationType(type);
  };
  const updateDeviceToken = (token) => {
    setDeviceToken(token);
  };
  const clearDeviceToken = () => {
    setDeviceToken(null);
  }
  const clearVerificationDetails = () => {
    setVerificationDetails(null);
    setVerificationType(null);
  };

  return (
    <UserContext.Provider value={{verificationDetails, verificationType,deviceToken, updateDeviceToken , updateVerificationDetails, clearVerificationDetails}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
