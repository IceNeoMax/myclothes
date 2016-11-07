/**
 * Created by vjtc0n on 9/22/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import {
    Router,
    Scene
} from 'react-native-router-flux'
import PersonalPageMain from './containers/PersonalPage';

class PersonalPage extends Component {
    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{flex: 1}}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <PersonalPageMain />
            </View>
        )
    }
}


module.exports = PersonalPage;