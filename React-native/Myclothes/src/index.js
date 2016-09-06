/**
 * Created by vjtc0n on 9/6/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Login from './Login/login';

class Main extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Login />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    }
});

module.exports = Main;