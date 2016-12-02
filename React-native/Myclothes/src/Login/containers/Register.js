/**
 * Created by vjtc0n on 12/2/16.
 */
/**
 * Register.js
 *
 * Allow user to register
 */
'use strict'
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */
import * as authActions from '../actions/login'

/**
 *   LoginRender
 */
import LoginRender from '../components/loginRender'

/**
 * The necessary React
 */
import React, { Component } from 'react';

const {
    LOGIN,
    REGISTER,
} = require('../libs/constraints').default;

/**
 * ## Redux boilerplate
 */

function mapStateToProps (state) {
    return {
        auth: state.auth,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    }
}


class Register extends Component {
    constructor (props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
    }

    onButtonPress() {
        this.props.actions.signup(this.props.auth.form.fields.username, this.props.auth.form.fields.email, this.props.auth.form.fields.password)
    }

    render () {
        let loginButtonText = 'Register';

        return (
            <LoginRender
                formType={REGISTER}
                loginButtonText={loginButtonText}
                onButtonPress={this.onButtonPress}
                displayPasswordCheckbox
                messageType={LOGIN}
                auth={this.props.auth}
            />

        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)
