import React, { Component } from 'react';
import { View, Text, ScrollView, NetInfo } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements'
import { connect } from 'react-redux';

import { requestPerson, requestPersonByUrl, connectionState } from './actions';

class NameList extends Component {
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
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <List>
                        {
                            this.props.people.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.name}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
                <Icon
                    raised
                    name={this.props.isConnected ? 'add' : 'alarm-add'}
                    color='#51b9d3'
                    reverse
                    onPress={() => this.props.dispatch(requestPerson({ index: this.props.personIndex }))}
                    containerStyle={{ position: 'absolute', right: 20, bottom: 20 }}
                />
            </View>
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

export default connect(mapStateToProps)(NameList);
