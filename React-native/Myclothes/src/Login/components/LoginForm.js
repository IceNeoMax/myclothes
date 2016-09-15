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
} = require('../libs/constraints').default;

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
            }
        };
        let email = {
            label: 'Email',
            keyboardType: 'email-address',
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.emailHasError,
            error: this.props.form.fields.emailErrorMsg
        };

        let secureTextEntry = !this.props.form.fields.showPassword;

        let password = {
            label: 'Password',
            maxLength: 12,
            secureTextEntry: secureTextEntry,
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.passwordHasError,
            error: this.props.form.fields.passwordErrorMsg
        };

        let loginForm;
        switch (formType) {
            case LOGIN:
                loginForm = t.struct({
                    email: t.String,
                    password: t.String
                });
                options.fields['email'] = email;
                options.fields['email'].placeholder = 'Email';
                options.fields['email'].autoCapitalize = 'none';
                options.fields['password'] = password;
                options.fields['password'].placeholder = 'Password';
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