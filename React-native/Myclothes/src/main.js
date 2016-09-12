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
import Login from './Login/login';

class Main extends Component {
    render() {
        return(
            <View>
                <Login />
            </View>
        )
    }
}

module.exports = Main;