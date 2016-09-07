/**
 * Created by vjtc0n on 9/7/16.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions';
import * as globalActions from '../reducers/global/globalActions';

/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

import FormButton from '../components/FormButton';
import ItemCheckbox from '../components/ItemCheckbox';
import ErrorAlert from '../components/ErrorAlert';
/**
 *  The LoginForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import LoginForm from '../components/LoginForm';
import React, {Component} from 'react';
import
{
    StyleSheet,
    ScrollView,
    Text,
    TouchableHighlight,
    View,
    Dimensions
}from 'react-native';

var {height, width} = Dimensions.get('window');

const {
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD
} = require('../lib/constants').default;
import styles from './styles/LoginRender';

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch)
    }
}
/**
 * ### Translations
 */
var I18n = require('react-native-i18n');
import Translations from '../lib/translation.json';
I18n.translations = Translations;

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

    /**
     * ### componentWillReceiveProps
     * As the properties are validated they will be set here.
     */
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

    /**
     * ### onChange
     *
     * As the user enters keys, this is called for each key stroke.
     * Rather then publish the rules for each of the fields, I find it
     * better to display the rules required as long as the field doesn't
     * meet the requirements.
     * *Note* that the fields are validated by the authReducer
     */
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
    /**
     *  Get the appropriate message for the current action
     *  @param messageType FORGOT_PASSWORD, or LOGIN, or REGISTER
     *  @param actions the action for the message type
     */
    getMessage (messageType, actions) {

        let alreadyHaveAccount =
            <TouchableHighlight
                onPress={() => {
              actions.loginState();
              Actions.Login()
            }} >
                <Text>{I18n.t('LoginRender.already_have_account')}</Text>
            </TouchableHighlight>;

        switch (messageType) {
            case LOGIN:
                return alreadyHaveAccount;
        }
    }

    /**
     * ### render
     * Setup some default presentations and render
     */
    render () {
        var formType = this.props.formType;
        var loginButtonText = this.props.loginButtonText;
        var onButtonPress = this.props.onButtonPress;
        var displayPasswordCheckbox = this.props.displayPasswordCheckbox;
        //var leftMessageType = this.props.leftMessageType
        //var rightMessageType = this.props.rightMessageType

        var passwordCheckbox = <Text />;
        //let leftMessage = this.getMessage(leftMessageType, this.props.actions)
        //let rightMessage = this.getMessage(rightMessageType, this.props.actions)


        // display the login / register / change password screens
        this.errorAlert.checkError(this.props.auth.form.error);

        /**
         * Toggle the display of the Password and PasswordAgain fields
         */
        if (displayPasswordCheckbox) {
            passwordCheckbox =
                <ItemCheckbox
                    text={I18n.t('LoginRender.show_password')}
                    disabled={this.props.auth.form.isFetching}
                    onCheck={() => {
            this.props.actions.onAuthFormFieldChange('showPassword', true)
          }}
                    onUncheck={() => {
            this.props.actions.onAuthFormFieldChange('showPassword', false)
          }}
                />
        }

        /**
         * The LoginForm is now defined with the required fields.  Just
         * surround it with the Header and the navigation messages
         * Note how the button too is disabled if we're fetching. The
         * header props are mostly for support of Hot reloading.
         * See the docs for Header for more info.
         */

        return (
            <View style={styles.container}>
                <ScrollView horizontal={false} width={width} height={height}>
                    <View>

                        <View style={styles.inputs}>
                            <LoginForm
                                formType={formType}
                                form={this.props.auth.form}
                                value={this.state.value}
                                onChange={this.onChange.bind(this)} />
                            {passwordCheckbox}
                        </View>

                        <FormButton
                            isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
                            onPress={onButtonPress}
                            buttonText={loginButtonText} />

                        <View >
                            <View style={styles.forgotContainer}>
                                <Text>forgot password ?</Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default connect(null, mapDispatchToProps)(LoginRender);
