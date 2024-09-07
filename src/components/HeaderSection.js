/* eslint-disable prettier/prettier */
import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import colors from '../utils/colors';

export default function HeaderSection({children}) {
    return(
        <>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <View style={styles.container}>
            {children}
        </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.primary,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        minHeight: 80,
    },
})