/**
 * Created by vjtc0n on 11/1/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import ProductPage from './containers/ProductPage'

class ProductMainPage extends Component {
    render() {
        return (
            <ProductPage />
        )
    }
}

module.exports = ProductMainPage;