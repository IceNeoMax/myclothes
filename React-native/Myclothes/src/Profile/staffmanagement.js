/**
 * Created by vjtc0n on 11/24/16.
 */
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
import Staff from './containers/StaffManagement';

class StaffManagement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{flex: 1, marginBottom: 50}}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <Staff  />
            </View>
        )
    }
}

module.exports = StaffManagement;