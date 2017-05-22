import React, { Component } from 'react';
import { StyleSheet, View, Button, Platform } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import TestButton from './TestButton';

import { DrawerButton } from '../components/Header';
import { PrimaryButton } from '../components/Buttons';

import Me from '../screens/Me';

const LeftDrawerButton = ({ navigate }) => {
  if (Platform.OS === 'android') {
    return <DrawerButton onPress={() => navigate('DrawerOpen')} />
  }

  return null;
}

const MainScreen = StackNavigator({
  Me: {
    screen: Me,
    navigationOptions: ({ navigation }) => ({
      title: 'Me',
      headerLeft: (
        <LeftDrawerButton {...navigation} />
      ),
    }),
  },
});

export default MainScreen;
