import React, { Component } from 'react';
import { View, Text, ScrollView, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { Header, Actions, Info } from '../components/UserDetails';
import colors from '../config/colors';
import { PrimaryButton } from '../components/Buttons';
import { TextInput } from '../components/TextInput';
import { logout, loadMe, signin, requestPerson, requestPersonByUrl, connectionState } from '../redux/actions';

const fields = [
    { placeholder: 'Email', stateKey: 'email', keyboardType: 'email-address' },
    { placeholder: 'Password', stateKey: 'password' },
];

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }
    handleSubmit = (index, override = false) => {
        if (index === fields.length - 1 || override) {
            console.log('Fields to submit');
            console.log(this.state);
            alert('Submit');
            this.props.signIn({ login: this.state.email, password: this.state.password });
        } else {
            const nextField = fields[index + 1];
            this[nextField.stateKey].focus();
        }
    };

    onInputChange = (text, stateKey) => {
        const mod = {};
        mod[stateKey] = text;
        console.log(stateKey);
        console.log(text);
        this.setState(mod);
    }

    render() {
        console.log('Login page');
        console.log(this.props);
        return (
            <KeyboardAwareScrollView style={{ backgroundColor: colors.background }}>
                {
                    fields.map((field, index) => (
                        <TextInput
                            key={field.stateKey}
                            onChangeText={(text) => this.onInputChange(text, field.stateKey)}
                            returnKeyType={index === fields.length - 1 ? 'done' : 'next'}
                            onSubmitEditing={() => this.handleSubmit(index)}
                            ref={(input) => this[field.stateKey] = input}
                            {...field}
                        />
                    ))
                }
                <View style={{ marginTop: 20 }}>
                    <PrimaryButton
                        label="Login"
                        onPress={() => this.handleSubmit(0, true)}
                    />
                </View>
            </KeyboardAwareScrollView>
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

const mapDispatchToProps = (dispatch) => {
    return ({
        signIn: ({ login, password }) => {
            dispatch(signin({ login, password }))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
