/**
 * Created by vjtc0n on 11/25/16.
 */
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import Personal from './containers/PersonalWall'

class PersonalWall extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{flex: 1}}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <Personal property={this.props.property}/>
            </View>
        )
    }
}

module.exports = PersonalWall;