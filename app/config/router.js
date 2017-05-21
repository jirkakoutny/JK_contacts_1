import React from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';

import Contacts from '../screens/Contacts';
import Details from '../screens/Details';
import NewContact from '../screens/NewContact';
import Me from '../screens/Me';
import About from '../screens/About';
import { DrawerButton } from '../components/Header';

import { capitalizeFirstLetter } from '../helpers/string';

const LeftDrawerButton = ({ navigate }) => {
  if (Platform.OS === 'android') {
    return <DrawerButton onPress={() => navigate('DrawerOpen')} />
  }

  return null;
}

export const ContactsStack = StackNavigator({
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

export const NewContactStack = StackNavigator({
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

export const MeStack = StackNavigator({
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

export const AboutStack = StackNavigator({
  About: {
    screen: About,
    navigationOptions: ({ navigation }) => ({
      title: 'About',
      headerLeft: (
        <LeftDrawerButton {...navigation} />
      ),
    }),
  },
});

export const Tabs = TabNavigator({
  Contacts: {
    screen: ContactsStack,
    navigationOptions: {
      tabBarLabel: 'Places',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-list" size={35} color={tintColor} />
    }
  },
  NewContact: {
    screen: NewContactStack,
    navigationOptions: {
      tabBarLabel: 'Feedback',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-add" size={35} color={tintColor} />
    }
  },
  Me: {
    screen: MeStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-contact" size={35} color={tintColor} />
    }
  },
  About: {
    screen: AboutStack,
    navigationOptions: {
      tabBarLabel: 'About',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-contact" size={35} color={tintColor} />
    }
  },
});

export const Drawer = DrawerNavigator({
  Contact: {
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
    }
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
