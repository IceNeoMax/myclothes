/**
 * Created by vjtc0n on 9/6/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import login from './Login/login';

class Main extends Component {
    render() {
        return(
            <View style={styles.container}>{login('ios')}</View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

module.exports = Main;