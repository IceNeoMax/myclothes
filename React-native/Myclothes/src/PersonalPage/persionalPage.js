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
import PersonalPageMain from './containers/PersonalPage';
import SearchMember from './containers/SearchMember';

class PersonalPage extends Component {
    render() {
        return (
            <View style={styles.conatiner}>
                <SearchMember />
                <PersonalPageMain />
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

module.exports = PersonalPage;