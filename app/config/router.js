import React from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';

import Contacts from '../screens/Contacts';
import Details from '../screens/Details';
import NewContact from '../screens/NewContact';
import Me from '../screens/Me';
import Service from '../screens/Service';
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
    navigationOptions: ({navigation}) => ({
      title: 'Contacts',
      headerLeft: ( 
        <LeftDrawerButton {...navigation} />
      ),
    }),
  },
  Details: {
    screen: Details,
    navigationOptions: ({navigation}) => ({
      title: `${capitalizeFirstLetter(navigation.state.params.name.first)} ${capitalizeFirstLetter(navigation.state.params.name.last)}`,
    }),
  },
});

export const NewContactStack = StackNavigator({
  NewContact: {
    screen: NewContact,
    navigationOptions: ({navigation}) => ({
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
    navigationOptions: ({navigation}) => ({
      title: 'Me',
      headerLeft: ( 
        <LeftDrawerButton {...navigation} />
      ),
    }),
  },
});

export const ServiceStack = StackNavigator({
  Me: {
    screen: Service,
    navigationOptions: ({navigation}) => ({
      title: 'Service',
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
      tabBar: {
        label: 'Contacts',
        icon: ({ tintColor }) => <Icon name="ios-list" size={35} color={tintColor} />
      }
    }
  },
  NewContact: {
    screen: NewContactStack,
    navigationOptions: {
      tabBar: {
        label: 'New Contact',
        icon: ({ tintColor }) => <Icon name="ios-add" size={35} color={tintColor} />
      }
    }
  },
  Me: {
    screen: MeStack,
    navigationOptions: {
      tabBar: {
        label: 'Me',
        icon: ({ tintColor }) => <Icon name="ios-contact" size={35} color={tintColor} />
      }
    }
  },
  Service: {
    screen: ServiceStack,
    navigationOptions: {
      tabBar: {
        label: 'Service',
        icon: ({ tintColor }) => <Icon name="ios-build" size={35} color={tintColor} />
      }
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
  },
  Service: {
    screen: ServiceStack,
    navigationOptions: {
      drawer: {
        label: 'Service',
      }
    }
  },
})
