/**
 * Created by vjtc0n on 9/23/16.
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
import SearchMember from './containers/SearchMember';

class SearchPage extends Component {
    render() {
        return (
            <View style={styles.conatiner}>
                <SearchMember />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        marginTop: 20
    }
});

module.exports = SearchPage;