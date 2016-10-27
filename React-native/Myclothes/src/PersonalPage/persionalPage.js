/**
 * Created by vjtc0n on 9/22/16.
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
import PersonalPageMain from './containers/personalPage';

class PersonalPage extends Component {
    render() {
        var marginTop = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={[styles.container, { marginTop: marginTop }]}>
                <PersonalPageMain />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

module.exports = PersonalPage;