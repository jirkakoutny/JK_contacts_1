import React, { Component, PropTypes } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import colors from '../config/colors';
import { ListItem } from '../components/ListItem';
import { contactDetail } from '../redux/actions';

class Contacts extends Component {
  render() {
    console.log('Rendering contacts');
    console.log(this.props);
    const contacts = this.props.contacts;
    return (
      <FlatList
        style={{ backgroundColor: colors.background }}
        data={contacts}
        renderItem={({ item }) =>
          <ListItem contact={item} onPress={() => this.props.contactDetail(item)} />
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

const mapDispatchToProps = (dispatch) => {
  return ({
    contactDetail: (item) => {
      dispatch(contactDetail(item))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
