/**
 * Created by vjtc0n on 11/5/16.
 */
/**
 * Created by vjtc0n on 11/1/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import ShoppingPage from './containers/ShoppingCart'

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{flex: 1, marginBottom: 50}}>
                <View style={{height: height, backgroundColor: '#FF90AD'}}/>
                <ShoppingPage productID={this.props.productID} />
            </View>
        )
    }
}

module.exports = ShoppingCart;