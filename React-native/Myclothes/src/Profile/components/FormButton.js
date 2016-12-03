/**
 * Created by vjtc0n on 9/21/16.
 */
/**
 * Created by vjtc0n on 9/15/16.
 */

import React from 'react'
import
{
    StyleSheet,
    View
} from 'react-native'

const Button = require('apsl-react-native-button');
import buttonStyles from './styles/buttonStyles';

var FormButton = React.createClass({
    /**
     * ### render
     *
     * Display the Button
     */
    render () {
        return (
            <View style={buttonStyles.signin}>
                <Button style={buttonStyles.button}
                        textStyle={{fontSize: 18, color: 'white'}}
                        isDisabled={this.props.isDisabled}
                        onPress={this.props.onPress} >
                    {this.props.buttonText}
                </Button>
            </View>
        )
    }
});

module.exports = FormButton;
