import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, DrawerNavigator } from 'react-navigation';

import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';
import ProfileScreen from './components/ProfileScreen';
import TestScreen from './components/TestScreen';

import MeStack from './config/router';

// export const AppNavigator = StackNavigator({
//   Login: { screen: LoginScreen },
//   Main: { screen: MainScreen },
//   Profile: { screen: ProfileScreen },
//   Test: { screen: TestScreen },
// });

export const AppNavigator = DrawerNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen, navigationOptions: {
      drawer: {
        label: 'Me',
      }
    } },
  Profile: { screen: ProfileScreen },
  Test: { screen: TestScreen },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
