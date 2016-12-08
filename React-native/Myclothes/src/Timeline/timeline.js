/**
 * Created by vjtc0n on 11/7/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import TimelinePage from './containers/Timeline'

class Timeline extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, borderRadius: 10, overflow: 'hidden', backgroundColor: 'white'}}>
                <TimelinePage
                    onCommentPress={this.props.onCommentPress}
                    rowID={this.props.rowID}
                    property={this.props.property} />
            </View>
        )
    }
}

module.exports = Timeline;