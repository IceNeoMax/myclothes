/**
 * Created by vjtc0n on 11/30/16.
 */
/**
 * Created by vjtc0n on 9/23/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import {
    Router,
    Scene
} from 'react-native-router-flux'
import Search from './containers/SearchProduct';

class SearchProduct extends Component {
    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={styles.conatiner}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <Search />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
    }
});

module.exports = SearchProduct;