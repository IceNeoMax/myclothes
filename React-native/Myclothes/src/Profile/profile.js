/**
 * Created by vjtc0n on 9/21/16.
 */
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import ProfileMain from './containers/profile';
import Cover from './containers/cover';

class Profile extends Component {
    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{ flex: 1, marginBottom: 50 }}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <ScrollView>
                    <Cover />
                    <ProfileMain />
                </ScrollView>
            </View>
        )
    }
}

module.exports = Profile;