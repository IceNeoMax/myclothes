/**
 * Created by vjtc0n on 9/12/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import Login from './containers/Login';

class LoginMain extends Component {
    render() {
        var marginTop = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{ marginTop: marginTop }}>
                <Login />
            </View>
        )
    }
}

module.exports = LoginMain;