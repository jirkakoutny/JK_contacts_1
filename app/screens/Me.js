import React, { Component } from 'react';
import { View, Text, ScrollView, NetInfo } from 'react-native';
import { connect } from 'react-redux';

import { Header, Actions, Info } from '../components/UserDetails';
import colors from '../config/colors';
import { PrimaryButton } from '../components/Buttons';
import { signout, loadMe, signin, requestPerson, requestPersonByUrl, connectionState } from '../redux/actions';

class Me extends Component {
  componentDidMount() {
    // connectivity state change - add listener
    NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
  }

  componentWillUnmount() {
    // connectivity state change - remove listener
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
  }

  // connectivity state change handler
  _handleConnectionChange = (isConnected) => {
    const { dispatch, actionQueue } = this.props;

    // log connectivity state
    // console.log(isConnected ? 'Connected' : 'Not connected');

    // dispatch connectivity state change event with parameter isConnected
    dispatch(connectionState({ status: isConnected }));

    // if is connected and tehere is something unprocessed in action queue, process it
    // if (isConnected && actionQueue != null && actionQueue.length > 0) {
    //   actionQueue.forEach((url) => {
    //     this.props.dispatch(requestPersonByUrl({ url }));
    //   });
    // }
  };

  render() {
    const me = this.props.me;
    if (me) {
      return (
        <ScrollView style={{ backgroundColor: colors.background }}>
          <Header {...me} />
          <PrimaryButton
            label="Edit Profile"
            onPress={() => null}
          />
          <PrimaryButton
            label={this.props.isConnected ? 'Load me' : 'Disconnected'}
            onPress={() => this.props.dispatch(loadMe({ index: 1 }))}
          />
          <PrimaryButton
            label={this.props.user ? this.props.user.email : "Unknown"}
            onPress={() => this.props.dispatch(signin({ login: "jirka@koutny.cz", password: "test01" }))}
          />
          <PrimaryButton
            label='LOGOUT'
            onPress={() => this.props.dispatch(signout())}
          />
          <Actions {...me} />
          <Info {...me} />
        </ScrollView>
      );
    }
    else {
      return (
        <ScrollView style={{ backgroundColor: colors.background }}>

        </ScrollView>
      );
    }
  };
}

// map redux state properties to 
const mapStateToProps = (state) => {
  return {
    me: state.app.me,
    user: state.auth.user,
    isConnected: state.app.isConnected,
  };
};

export default connect(mapStateToProps)(Me);
