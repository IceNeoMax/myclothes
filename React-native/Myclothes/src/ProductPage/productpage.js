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

import ProductPage from './containers/ProductPage'

class ProductMainPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{flex: 1}}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <ProductPage
                    isProduct={this.props.isProduct}
                    product_id={this.props.product_id} />
            </View>
        )
    }
}

module.exports = ProductMainPage;