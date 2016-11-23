/**
 * Created by vjtc0n on 11/23/16.
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
import Order from './containers/OrderManagement'

class OrderManagement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{flex: 1, marginBottom: 50}}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <Order  />
            </View>
        )
    }
}

module.exports = OrderManagement;