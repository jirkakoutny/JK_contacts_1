import React from 'react';
import { addNavigationHelpers, StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DrawerButton } from '../components/Header';
import { capitalizeFirstLetter } from '../helpers/string';

import Contacts from '../screens/Contacts';
import Details from '../screens/Details';
import NewContact from '../screens/NewContact';
import Me from '../screens/Me';

const LeftDrawerButton = ({ navigate }) => {
  if (Platform.OS === 'android') {
    return <DrawerButton onPress={() => navigate('DrawerOpen')} />
  }

  return null;
}

const ContactsStack = StackNavigator({
  Contacts: {
    screen: Contacts,
    navigationOptions: ({ navigation }) => ({
      title: 'Contacts',
      headerLeft: (
        <LeftDrawerButton {...navigation} />
      ),
    }),
  },
  Details: {
    screen: Details,
    navigationOptions: ({ navigation }) => ({
      title: `${capitalizeFirstLetter(navigation.state.params.name.first)} ${capitalizeFirstLetter(navigation.state.params.name.last)}`,
    }),
  },
});

const NewContactStack = StackNavigator({
  NewContact: {
    screen: NewContact,
    navigationOptions: ({ navigation }) => ({
      title: 'New Contact',
      headerLeft: (
        <LeftDrawerButton {...navigation} />
      ),
    }),
  },
});

const MeStack = StackNavigator({
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

const Tabs = TabNavigator({
  Contacts: {
    screen: ContactsStack,
    navigationOptions: {
      tabBarLabel: 'Contacts',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-list" size={35} color={tintColor} />
    }
  },
  NewContact: {
    screen: NewContactStack,
    navigationOptions: {
      tabBarLabel: 'New Contact',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-add" size={35} color={tintColor} />,
    }
  },
  Me: {
    screen: MeStack,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-contact" size={35} color={tintColor} />
    }
  }
});

const Drawer = DrawerNavigator({
  Contacts: {
    screen: ContactsStack,
    navigationOptions: {
      drawer: {
        label: 'Contacts',
      }
    }
  },
  NewContact: {
    screen: NewContactStack,
    navigationOptions: {
      drawer: {
        label: 'New Contact',
      }
    },
  },
  Me: {
    screen: MeStack,
    navigationOptions: {
      drawer: {
        label: 'Me',
      }
    }
  }
})

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

export const AppNavigator = Platform.OS === 'ios' ? Tabs : Drawer;

export default connect(mapStateToProps)(AppWithNavigationState);

