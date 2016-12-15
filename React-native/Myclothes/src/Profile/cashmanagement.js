/**
 * Created by vjtc0n on 12/15/16.
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
import Cash from './containers/CashManagement'

class CashManagement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{flex: 1, marginBottom: 50}}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <Cash  />
            </View>
        )
    }
}

module.exports = CashManagement;