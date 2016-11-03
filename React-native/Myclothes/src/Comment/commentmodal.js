/**
 * Created by vjtc0n on 11/3/16.
 */
/**
 * Created by vjtc0n on 9/19/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Comment from './containers/CommentModal'

class CommentModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Comment
                isOpen={this.props.isOpen}
                onClosed={() => this.props.onClosed()} />
        )
    }
}

module.exports = CommentModal;