/**
 * Created by vjtc0n on 9/12/16.
 */
import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import loginStyles from './styles/loginStyles';

const {
    LOGIN,
    REGISTER
} = require('../libs/constraints').default;

import stylesheet from './styles/formStyles';

var t = require('tcomb-form-native');
var Form = t.form.Form;

var LoginForm = React.createClass({
    propTypes: {
        formType: PropTypes.string,
        form: PropTypes.object,
        value: PropTypes.object,
        onChange: PropTypes.func
    },

    render() {
        let formType = this.props.formType;

        let options = {
            fields: {

            },
            stylesheet: stylesheet
        };

        let username = {
            label: ' ',
            maxLength: 12,
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.usernameHasError,
            error: this.props.form.fields.usernameErrorMsg
        };

        let email = {
            label: ' ',
            keyboardType: 'email-address',
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.emailHasError,
            error: this.props.form.fields.emailErrorMsg
        };

        let secureTextEntry = !this.props.form.fields.showPassword;

        let password = {
            label: ' ',
            maxLength: 12,
            secureTextEntry: secureTextEntry,
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.passwordHasError,
            error: this.props.form.fields.passwordErrorMsg,
        };

        let passwordAgain = {
            label: ' ',
            secureTextEntry: secureTextEntry,
            maxLength: 12,
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.passwordAgainHasError,
            error: this.props.form.fields.passwordAgainErrorMsg
        };

        let loginForm;
        switch (formType) {
            case (REGISTER):
                loginForm = t.struct({
                    username: t.String,
                    email: t.String,
                    password: t.String,
                    passwordAgain: t.String
                });
                options.fields['username'] = username;
                options.fields['username'].placeholder = 'User name';
                options.fields['username'].autoCapitalize = 'none';
                options.fields['username'].underlineColorAndroid = 'white';
                options.fields['email'] = email;
                options.fields['email'].placeholder = 'Email';
                options.fields['email'].autoCapitalize = 'none';
                options.fields['email'].underlineColorAndroid = 'white';
                options.fields['password'] = password;
                options.fields['password'].placeholder = 'Password';
                options.fields['password'].underlineColorAndroid = 'white';
                options.fields['passwordAgain'] = passwordAgain;
                options.fields['passwordAgain'].placeholder = 'Password again';
                options.fields['password'].underlineColorAndroid = 'white';
                options.stylesheet.textbox.normal = {
                    color: 'black',
                    height: 36,
                    padding: 7,
                    borderRadius: 4,
                    borderWidth: 2,
                    marginBottom: 0,
                    borderColor: 'white',
                    backgroundColor: 'white'
                };
                options.stylesheet.textbox.error = {
                    color: 'black',
                    height: 36,
                    padding: 7,
                    borderRadius: 4,
                    borderWidth: 2,
                    marginBottom: 0,
                    borderColor: 'white',
                    backgroundColor: 'white'
                };
                options.stylesheet.errorBlock = {
                    color: 'white'
                };
                break;
            case LOGIN:
                loginForm = t.struct({
                    email: t.String,
                    password: t.String
                });
                options.fields['email'] = email;
                options.fields['email'].placeholder = 'Email';
                options.fields['email'].autoCapitalize = 'none';
                options.fields['email'].underlineColorAndroid = 'white';
                options.fields['password'] = password;
                options.fields['password'].placeholder = 'Password';
                options.fields['password'].underlineColorAndroid = 'white';
                options.stylesheet.textbox.normal = {
                    color: 'black',
                    height: 36,
                    padding: 7,
                    borderRadius: 4,
                    borderWidth: 2,
                    marginBottom: 0,
                    borderColor: 'white',
                    backgroundColor: 'white'
                };
                options.stylesheet.textbox.error = {
                    color: 'black',
                    height: 36,
                    padding: 7,
                    borderRadius: 4,
                    borderWidth: 2,
                    marginBottom: 0,
                    borderColor: 'white',
                    backgroundColor: 'white'
                };
                options.stylesheet.errorBlock = {
                    color: 'white'
                };
                break;
        }

        return (
            <Form ref='form'
                  type={loginForm}
                  options={options}
                  value={this.props.value}
                  onChange={this.props.onChange}
            />

        )
    }

});


module.exports = LoginForm;