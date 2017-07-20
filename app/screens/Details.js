import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { Header, Actions, Info } from '../components/UserDetails';
import colors from '../config/colors';

class Details extends Component {
  render() {
    console.log('Rendering contact detail');
    console.log(this.props);
    var index = this.props.contacts.map(i => i.email).indexOf(this.props.navigation.state.params.email)
    // const contact = this.props.contacts[index];
    const contact = this.props.contact;
    return (
      <ScrollView style={{ backgroundColor: colors.background }}>
        <Header {...contact} />
        <Actions {...contact} />
        <Info {...contact} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.app.contacts,
    contact: state.app.contact
  };
};

export default connect(mapStateToProps)(Details);
