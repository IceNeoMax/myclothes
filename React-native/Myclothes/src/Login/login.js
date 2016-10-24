/**
 * Created by vjtc0n on 9/12/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Login from './containers/Login';

class LoginMain extends Component {
    render() {
        return (
            <Login />
        )
    }
}

module.exports = LoginMain;