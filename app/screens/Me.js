import React, { Component } from 'react';
import { View, Text, ScrollView, NetInfo } from 'react-native';
import { connect } from 'react-redux';

import { Header, Actions, Info } from '../components/UserDetails';
import colors from '../config/colors';
// import { me } from '../config/data';
import { PrimaryButton } from '../components/Buttons';
import { loadMe, requestPerson, requestPersonByUrl, connectionState } from '../redux/actions';

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
    console.log(isConnected ? 'Connected' : 'Not connected');

    // dispatch connectivity state change event with parameter isConnected
    dispatch(connectionState({ status: isConnected }));

    // if is connected and tehere is something unprocessed in action queue, process it
    if (isConnected && actionQueue.length > 0) {
      actionQueue.forEach((url) => {
        this.props.dispatch(requestPersonByUrl({ url }));
      });
    }
  };

  render() {
    console.log('Rendering me');
    return (
      <ScrollView style={{ backgroundColor: colors.background }}>
        {/*<Header {...me} />*/}
        <Text>
          {this.props.mo.name.first}
        </Text>
        <Text>
          {this.props.mo.name.last}
        </Text>
        <PrimaryButton
          label="Edit Profile"
          onPress={() => null}
        />
        <PrimaryButton
          label={this.props.isConnected ? 'Load me' : 'Disconnected'}
          onPress={() => this.props.dispatch(loadMe({ index: 1 }))}
        />
        {/*<Actions {...me} />
        <Info {...me} />*/}
      </ScrollView>
    );
  }
}

// map redux state properties to 
const mapStateToProps = (state) => {
  return {
    mo: state.me,
    people: state.people,
    personIndex: state.personIndex,
    actionQueue: state.actionQueue,
    isConnected: state.isConnected,
  };
};

export default connect(mapStateToProps)(Me);
