/**
 * Created by vjtc0n on 9/7/16.
 */
import React from 'react';
import
{
    StyleSheet,
    View
} from 'react-native';

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button');
import styles from './styles/FormButton';

var FormButton = React.createClass({
    /**
     * ### render
     *
     * Display the Button
     */
    render () {
        return (
            <View style={styles.signin}>
                <Button style={styles.button}
                        textStyle={{fontSize: 18}}
                        isDisabled={this.props.isDisabled}
                        onPress={this.props.onPress} >
                    {this.props.buttonText}
                </Button>
            </View>
        )
    }
});

module.exports = FormButton;
