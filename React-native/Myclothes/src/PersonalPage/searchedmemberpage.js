/**
 * Created by vjtc0n on 10/10/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import SearchedMemberPageMain from './containers/SearchedMemberPage';

class SearchedMemberPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.conatiner}>
                <SearchedMemberPageMain
                    user_name={this.props.user_name}
                />
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

module.exports = SearchedMemberPage;