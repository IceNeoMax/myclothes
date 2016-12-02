/**
 * Created by vjtc0n on 9/12/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import loginStyles from './styles/loginStyles';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from './LoginForm';
import LoginButton from './LoginButton';
import ErrorAlert from './ErrorAlert';
import { Actions } from 'react-native-router-flux'

/**
 * The actions we need
 */
import * as authActions from '../actions/login';

const {
    LOGIN,
    REGISTER,
} = require('../libs/constraints').default;

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
                username: this.props.auth.form.fields.username,
                email: this.props.auth.form.fields.email,
                password: this.props.auth.form.fields.password,
                passwordAgain: this.props.auth.form.fields.passwordAgain
            }
        }
    }

    componentWillReceiveProps (nextprops) {
        this.setState({
            value: {
                username: nextprops.auth.form.fields.username,
                email: nextprops.auth.form.fields.email,
                password: nextprops.auth.form.fields.password,
                passwordAgain: nextprops.auth.form.fields.passwordAgain
            }
        })
    }

    onChange (value) {
        if (value.username !== '') {
            this.props.actions.onAuthFormFieldChange('username', value.username)
        }
        if (value.email !== '') {
            this.props.actions.onAuthFormFieldChange('email', value.email)
        }
        if (value.password !== '') {
            this.props.actions.onAuthFormFieldChange('password', value.password)
        }
        if (value.passwordAgain !== '') {
            this.props.actions.onAuthFormFieldChange('passwordAgain', value.passwordAgain)
        }
        this.setState(
            {value}
        )
    }

    getMessage (messageType, actions) {
        let alreadyHaveAccount =
            <TouchableHighlight
                style={{alignSelf: 'center'}}
                onPress={() => {
                    actions.loginState()
                    Actions.LoginMain()
                }} >
                <Text style={{color: '#595959'}}>Already have account ?</Text>
            </TouchableHighlight>

        let register =
            <TouchableHighlight
                style={{alignSelf: 'center'}}
                onPress={() => {
                    actions.registerState()
                    Actions.Register()
                }} >
                <Text style={{color: '#595959'}}>Don't have any accounts? Let's sign up for free</Text>
            </TouchableHighlight>

        switch (messageType.toString()) {
            case LOGIN:
                return alreadyHaveAccount;
            case REGISTER:
                return register
        }
    }

    render() {
        var formType = this.props.formType;
        var loginButtonText = this.props.loginButtonText;
        var onButtonPress = this.props.onButtonPress;
        var displayPasswordCheckbox = this.props.displayPasswordCheckbox;
        var messageType = this.props.messageType;

        let message = this.getMessage(messageType, this.props.actions)
        let self = this;
        this.errorAlert.checkError(this.props.auth.form.error);
        let isDisable = (!this.props.auth.form.isValid || this.props.auth.form.isFetching);
        //console.log('The button is' + isDisable);

        return (
            <View style={loginStyles.container}>
                <View style={{flex: 1/3, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', color: 'white', fontSize: 50, marginTop: 80}}>Myclothes</Text>
                </View>
                <View style={{flex: 2/3, marginLeft: 25, marginRight: 25}}>
                    <View>
                        <LoginForm
                            formType={formType}
                            form={this.props.auth.form}
                            value={this.state.value}
                            onChange={self.onChange.bind(self)} />
                    </View>
                    <View>
                        <LoginButton
                            isDisabled={isDisable}
                            onPress={onButtonPress}
                            buttonText={loginButtonText} />
                    </View>
                    {message}
                </View>
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(LoginRender)