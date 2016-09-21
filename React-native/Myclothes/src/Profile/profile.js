/**
 * Created by vjtc0n on 9/21/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ProfileMain from './containers/profile';

class Profile extends Component {
    render() {
        return (
            <ProfileMain />
        )
    }
}

module.exports = Profile;