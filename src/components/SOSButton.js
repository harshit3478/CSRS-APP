/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import colors from '../utils/colors';

export default function SOSButton({
  onPressIn,
  onPressOut,
  children,
  isTapped = false,
}) {
  const radius = 85; // Control the size centrally

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.outerCircle,
          {
            width: radius * 4,
            height: radius * 4,
            borderRadius: radius * 2,
            borderColor: isTapped ? 'rgba(255, 99, 71, 0.5)' : 'white',
            shadowColor: isTapped ? 'red' : colors.primary,
          },
        ]}>
        <View
          style={[
            styles.middleCircle,
            {
              width: radius * 3.4,
              height: radius * 3.4,
              borderRadius: radius * 1.7,
              borderColor: isTapped ? 'rgba(255, 99, 71, 0.3)' : 'white',
              shadowColor: isTapped ? 'red' : colors.primary,
            },
          ]}>
          <TouchableWithoutFeedback
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onLongPress={() => console.log('SOS Pressed')}
            delayLongPress={5000}>
            <View
              style={[
                styles.innerCircle,
                {
                  width: radius * 3,
                  height: radius * 3,
                  borderRadius: radius * 1.5,
                  shadowColor: isTapped ? 'red' : colors.primary,
                },
              ]}>
              <View
                style={[
                  styles.sosButton,
                  {
                    width: radius * 2.5,
                    height: radius * 2.5,
                    borderRadius: radius * 1.25,
                  },
                ]}>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 100,
    // shadowRadius: 10,
  },
  middleCircle: {
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    // color: colors.primary,
    elevation: 40,
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    // Elevation for Android
    elevation: 40,
    backgroundColor: 'white',
  },
  sosButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
