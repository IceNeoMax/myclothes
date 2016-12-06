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

import DetailPage from './containers/Detail'

class Detail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <DetailPage
                    onProductCommentPress={this.props.onProductCommentPress}
                    property={this.props.property} />
            </View>
        )
    }
}

module.exports = Detail;