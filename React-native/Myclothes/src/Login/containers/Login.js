/**
 * Created by vjtc0n on 9/12/16.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginRender from '../components/loginRender';

import * as LoginActions from '../actions/login';
import React, { Component } from 'react';
const {
    LOGIN
} = require('../libs/constraints').default;


function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(...LoginActions, dispatch)
    };
}

function buttonPressHandler (login, username, password) {
    login(username, password)
}

let Login = React.createClass({
    render() {

        let loginButtonText = 'Log in';
        let onButtonPress = buttonPressHandler.bind(null,
            this.props.actions.login,
            this.props.auth.form.fields.email,
            this.props.auth.form.fields.password
        );

        return(
            <LoginRender
                formType={LOGIN}
                loginButtonText={loginButtonText}
                onButtonPress={onButtonPress}
                displayPasswordCheckbox
                auth={this.props.auth}
            />
        )

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);