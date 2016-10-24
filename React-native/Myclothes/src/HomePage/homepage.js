/**
 * Created by vjtc0n on 9/19/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import HomePage from './containers/HomePage'

class Home extends Component {
    render() {
        return (
            <HomePage />
        )
    }
}

module.exports = Home;