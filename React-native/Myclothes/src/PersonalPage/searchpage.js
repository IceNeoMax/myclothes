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
import SearchMember from './containers/SearchMember';

class SearchPage extends Component {
    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={styles.conatiner}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <SearchMember />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
    }
});

module.exports = SearchPage;