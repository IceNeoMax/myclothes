/**
 * Created by vjtc0n on 11/10/16.
 */
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform,
    WebView
} from 'react-native';

class DesignClothes extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <WebView
                    source={{uri: 'http://gecko.vn/thiet-ke-ao'}}
                    style={{marginTop: 20}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

module.exports = DesignClothes;