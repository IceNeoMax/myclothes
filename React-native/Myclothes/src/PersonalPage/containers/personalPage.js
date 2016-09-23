/**
 * Created by vjtc0n on 9/22/16.
 */
import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Actions} from 'react-native-router-flux'

class PersonalPage extends Component {

    constructor (props) {
        super(props);
        this.onFocus = this.onFocus.bind(this)
    }

    onFocus() {
        Actions.Search();
    }

    render() {
        return (
            <View>
                <TextInput style={styles.searchBar}
                           onFocus={this.onFocus} />
                <Text>ABC</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar: {
        height: 40,
        borderWidth: 1,
        marginRight: 20,
        borderRadius: 10
    }
});

module.exports = PersonalPage;