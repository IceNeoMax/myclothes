/**
 * Created by vjtc0n on 9/12/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import loginStyles from './styles/loginStyles';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from './LoginForm';
import LoginButton from './LoginButton';
import ErrorAlert from './ErrorAlert';

/**
 * The actions we need
 */
import * as authActions from '../actions/login';

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({ ...authActions }, dispatch)
    }
}

class LoginRender extends Component {

    constructor (props) {
        super(props);
        this.errorAlert = new ErrorAlert();
        this.state = {
            value: {
                //username: this.props.auth.form.fields.username,
                email: this.props.auth.form.fields.email,
                password: this.props.auth.form.fields.password,
                //passwordAgain: this.props.auth.form.fields.passwordAgain
            }
        }
    }

    componentWillReceiveProps (nextprops) {
        this.setState({
            value: {
                email: nextprops.auth.form.fields.email,
                password: nextprops.auth.form.fields.password
            }
        })
    }

    onChange (value) {
        if (value.email !== '') {
            this.props.actions.onAuthFormFieldChange('email', value.email)
        }
        if (value.password !== '') {
            this.props.actions.onAuthFormFieldChange('password', value.password)
        }
        this.setState(
            {value}
        )
    }

    render() {
        var formType = this.props.formType;
        var loginButtonText = this.props.loginButtonText;
        var onButtonPress = this.props.onButtonPress;
        var displayPasswordCheckbox = this.props.displayPasswordCheckbox;
        
        let self = this;
        this.errorAlert.checkError(this.props.auth.form.error);
        let isDisable = (!this.props.auth.form.isValid || this.props.auth.form.isFetching);
        console.log('The button is' + isDisable);

        return (
            <View style={loginStyles.container}>
                <LoginForm
                    formType={formType}
                    form={this.props.auth.form}
                    value={this.state.value}
                    onChange={self.onChange.bind(self)} />
                <LoginButton
                    isDisabled={isDisable}
                    onPress={onButtonPress}
                    buttonText={loginButtonText} />
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(LoginRender)