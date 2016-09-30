/**
 * Created by vjtc0n on 9/21/16.
 */
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ProfileMain from './containers/profile';
import Cover from './containers/cover';

class Profile extends Component {
    render() {
        return (
            <ScrollView style={{ flex: 1, marginTop: 20 }}>
                <Cover />
                <ProfileMain />
            </ScrollView>
        )
    }
}

module.exports = Profile;