/**
 * Created by vjtc0n on 12/2/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import RegisterMain from './containers/Register';

class Register extends Component {
    render() {
        return (
            <View style={{flex: 1 }}>
                <RegisterMain />
            </View>
        )
    }
}

module.exports = Register;