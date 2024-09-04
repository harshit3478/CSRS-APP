import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Link} from '@react-navigation/native';

import colors from '../utils/colors'

export default function BottomSection({des, linkText, linkPath}) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{des}</Text>
        <Link style={styles.link} to={linkPath}>
          {linkText}
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 30,
  },
  text: {
    color:colors.dark,
    fontSize: 16,
  },
  link: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'semibold',
    marginLeft: 2,
  },
});
