/**
 * Created by vjtc0n on 9/22/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {
    Router,
    Scene
} from 'react-native-router-flux'
import PersonalPageMain from './containers/PersonalPage';

class PersonalPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <PersonalPageMain />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    }
});

module.exports = PersonalPage;