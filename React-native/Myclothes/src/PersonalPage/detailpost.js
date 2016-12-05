/**
 * Created by vjtc0n on 11/30/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import Detail from './containers/DetailPost';

class DetailPost extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{flex: 1}}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <Detail property={this.props.property} />
            </View>
        )
    }
}

module.exports = DetailPost;