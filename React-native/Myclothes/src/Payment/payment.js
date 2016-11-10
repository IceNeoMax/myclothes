/**
 * Created by vjtc0n on 11/10/16.
 */
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import PaymentMethod from './containers/Payment';

class Payment extends Component {
    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{flex: 1}}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <PaymentMethod />
            </View>
        )
    }
}

module.exports = Payment;