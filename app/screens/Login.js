import React, { Component } from 'react';
import { View, Text, ScrollView, NetInfo } from 'react-native';
import { connect } from 'react-redux';

import { Header, Actions, Info } from '../components/UserDetails';
import colors from '../config/colors';
import { PrimaryButton } from '../components/Buttons';
import { logout, loadMe, signin, requestPerson, requestPersonByUrl, connectionState } from '../redux/actions';

class Login extends Component {
    render() {
        console.log('Login page');
        console.log(this.props);
        return (
            <ScrollView style={{ backgroundColor: colors.background }}>

            </ScrollView>
        );
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

export default connect(mapStateToProps)(Login);
