import React, { Component, PropTypes } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import colors from '../config/colors';
import { ListItem } from '../components/ListItem';

class Contacts extends Component {
  handleRowPress = (item) => {
    this.props.navigation.navigate('Details', item);
  };

  render() {
    console.log('Rendering contacts');
    console.log(this.props);
    const contacts = this.props.contacts;
    return (
      <FlatList
        style={{ backgroundColor: colors.background }}
        data={contacts}
        renderItem={({ item }) =>
          <ListItem contact={item} onPress={() => this.handleRowPress(item)} />
        }
        keyExtractor={(item) => item.email}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.app.contacts,
  };
};

export default connect(mapStateToProps)(Contacts);
