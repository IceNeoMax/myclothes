/**
 * Created by vjtc0n on 9/6/16.
 */
import React, {PropTypes, Component} from 'react';

const {
    REGISTER,
    LOGIN,
    FORGOT_PASSWORD
} = require('../lib/constants').default;


const t = require('tcomb-form-native');
let Form = t.form.Form;
var I18n = require('react-native-i18n');
import Translation from '../lib/translation.json';
I18n.translations = Translation;

class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let formType = this.props.formType;

        let options = {
            fields: {
            }
        };

        let username = {
            label: I18n.t('LoginForm.username'),
            maxLength: 12,
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.usernameHasError,
            error: this.props.form.fields.usernameErrorMsg
        };

        let email = {
            label: I18n.t('LoginForm.email'),
            keyboardType: 'email-address',
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.emailHasError,
            error: this.props.form.fields.emailErrorMsg
        };

        let secureTextEntry = !this.props.form.fields.showPassword

        let password = {
            label: I18n.t('LoginForm.password'),
            maxLength: 12,
            secureTextEntry: secureTextEntry,
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.passwordHasError,
            error: this.props.form.fields.passwordErrorMsg
        };

        let passwordAgain = {
            label: I18n.t('LoginForm.password_again'),
            secureTextEntry: secureTextEntry,
            maxLength: 12,
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.passwordAgainHasError,
            error: this.props.form.fields.passwordAgainErrorMsg
        };

        let loginForm;
        switch (formType) {
            case (LOGIN):
                loginForm = t.struct({
                    username: t.string,
                    password: t.string
                });
                options.fields['username'] = username;
                options.fields['username'].placeholder = I18n.t('LoginForm.username');
                options.fields['username'].autoCapitalize = 'none';
                options.fields['password'] = password;
                options.fields['password'].placeholder = I18n.t('LoginForm.password');
                break;
            case (REGISTER):
                break;
            case (FORGOT_PASSWORD):
                break;
        };

        return (
            <Form ref='form'
                type={loginForm}
                options={options}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        );
    }

}

LoginForm.propTypes = {
    formType: React.PropTypes.string,
    form: React.PropTypes.object,
    value: React.PropTypes.func
};

module.exports = LoginForm;