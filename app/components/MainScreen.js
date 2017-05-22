import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import TestButton from './TestButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = () => (
  <View style={styles.container}>
    <LoginStatusMessage />
    <AuthButton />
    <TestButton />
  </View>
);

MainScreen.navigationOptions = {
  title: 'Home Screen JK',
};

export default MainScreen;
