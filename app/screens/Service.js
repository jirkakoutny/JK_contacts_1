import React, { Component } from 'react';
import { FlatList, View, Text, ScrollView, NetInfo } from 'react-native';
import { connect } from 'react-redux';

import { Header, Actions, Info } from '../components/UserDetails';
import colors from '../config/colors';
import { me } from '../config/data';
import { PrimaryButton } from '../components/Buttons';
import { ListItem } from '../components/ListItem';
import { contacts } from '../config/data';
import { requestPerson, requestPersonByUrl, connectionState } from '../actions';

class Service extends Component {
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
        return (
            <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
                <ScrollView>
                    <FlatList
                        style={{ backgroundColor: colors.background }}
                        data={this.props.people}
                        renderItem={({ item }) =>
                            <ListItem contact={item} />
                        }
                        keyExtractor={(item) => item.name}
                    />
                </ScrollView>
                <PrimaryButton
                    label={this.props.isConnected ? 'Connected' : 'Disconnected'}
                    onPress={() => this.props.dispatch(requestPerson({ index: this.props.personIndex }))}
                />
            </ScrollView>
        );
    }
}

// map redux state properties to 
const mapStateToProps = (state) => {
    return {
        people: state.people,
        personIndex: state.personIndex,
        actionQueue: state.actionQueue,
        isConnected: state.isConnected,
    };
};

export default connect(mapStateToProps)(Service);;
