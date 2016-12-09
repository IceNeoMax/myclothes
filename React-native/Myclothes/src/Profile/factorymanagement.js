/**
 * Created by vjtc0n on 12/9/16.
 */

import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import ButtonAPSL from 'apsl-react-native-button'
import Factory from './containers/FactoryManagement'

class FactoryManagement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{flex: 1, marginBottom: 50}}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <Factory  />
            </View>
        )
    }
}

module.exports = FactoryManagement;