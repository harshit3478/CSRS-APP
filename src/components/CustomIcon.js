/* eslint-disable prettier/prettier */
// src/components/CustomIcon.js
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomIcon = ({ name, color, size }) => (
  <MaterialCommunityIcons name={name} color={color} size={size} />
);

export default CustomIcon;
