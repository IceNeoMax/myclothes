/**
 * Created by vjtc0n on 10/10/16.
 */
import React, { Component, PropTypes } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Actions} from 'react-native-router-flux'

class SearchedMemberPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user_name: ''
        }
    }
    componentWillMount() {
        this.setState({
            user_name: this.props.user_name
        })
    }

    render() {
        console.log(this.props.user_name);
        console.log(this.state.user_name);
        return (
            <View>
                <Text>
                    Hello!
                    {this.props.user_name}
                </Text>
            </View>
        )
    }
}

module.exports = SearchedMemberPage;