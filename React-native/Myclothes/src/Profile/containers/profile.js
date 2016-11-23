/**
 * Created by vjtc0n on 9/21/16.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as profileActions from '../actions/profile';

import Button from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'

import ErrorAlert from '../components/ErrorAlert';
import FormButton from '../components/FormButton';

import React, {Component} from 'react'
import
{
    StyleSheet,
    View,
    Dimensions,
    Text,
    ScrollView
}
    from 'react-native'

const window = Dimensions.get('window');

/**
 * The form processing component
 */
import t from 'tcomb-form-native'

let Form = t.form.Form;

function mapStateToProps (state) {
    return {
        profile: state.profile,
        global: state.global
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({ ...profileActions }, dispatch)
    }
}

class Profile extends Component {

    constructor (props) {
        super(props);
        this.errorAlert = new ErrorAlert();
        this.state = {
            formValues: {
                username: '',
                email: ''
            }
        };

        this.onButtonPress = this.onButtonPress.bind(this);
    }

    componentWillReceiveProps (props) {
        this.setState({
            formValues: {
                username: props.profile.form.fields.username,
                email: props.profile.form.fields.email
            }
        })
    }

    componentDidMount () {
        if (this.props.profile.form.fields.username === '' && this.props.profile.form.fields.email === '') {
            this.props.actions.getProfile(this.props.global.token, this.props.global.userId);
        } else {
            this.setState({
                formValues: {
                    username: this.props.profile.form.fields.username,
                    email: this.props.profile.form.fields.email
                }
            })
        }
    }

    onChange (value) {
        if (value.username !== '') {
            this.props.actions.onProfileFormFieldChange('username', value.username)
        }
        if (value.email !== '') {
            this.props.actions.onProfileFormFieldChange('email', value.email)
        }
        this.setState({value})
    }

    onButtonPress () {
        this.props.actions.updateProfile(this.props.global.token, this.props.global.userId, {
            user_name: this.props.profile.form.fields.username
        });
    }


    render() {
        //this.errorAlert.checkError(this.props.profile.form.error);

        let self = this;

        let ProfileForm = t.struct({
            username: t.String,
            email: t.String
        });
        /**
         * Set up the field definitions.  If we're fetching, the fields
         * are disabled.
         */
        let options = {
            auto: 'placeholders',
            fields: {
                username: {
                    label: 'User Name',
                    maxLength: 12,
                    editable: !this.props.profile.form.isFetching,
                    hasError: this.props.profile.form.fields.usernameHasError,
                    error: this.props.profile.form.fields.usernameErrorMsg
                },
                email: {
                    label: 'Email',
                    keyboardType: 'email-address',
                    editable: !this.props.profile.form.isFetching,
                    hasError: this.props.profile.form.fields.emailHasError,
                    error: this.props.profile.form.fields.emailErrorMsg
                }
            }
        };
        let profileButtonText = 'Update Profile';


        return (
            <View style={styles.container}>
                <View style={styles.inputs}>
                    <Form
                        ref='form'
                        type={ProfileForm}
                        options={options}
                        value={this.state.formValues}
                        onChange={this.onChange.bind(self)}
                    />
                </View>

                <FormButton
                    isDisabled={!this.props.profile.form.isValid || this.props.profile.form.isFetching}
                    onPress={this.onButtonPress}
                    buttonText={profileButtonText} />

                <Button style={styles.otherButton}>
                    <Icon name='credit-card' size={30} color='#f66f88' style={{flex: 1/8, marginLeft: 10}} />
                    <Text style={styles.otherButtonText}>Payment Method</Text>
                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1/8}}>
                        <Icon name='angle-right' size={30} color='gray'  />
                    </View>
                </Button>

                <Button style={styles.otherButton}>
                    <Icon name='money' size={30} color='#f66f88' style={{flex: 1/8, marginLeft: 10}} />
                    <Text style={styles.otherButtonText}>Your Wallet</Text>
                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1/8}}>
                        <Icon name='angle-right' size={30} color='gray'  />
                    </View>
                </Button>

                <Button style={styles.otherButton}>
                    <Icon name='cog' size={30} color='#f66f88' style={{flex: 1/8, marginLeft: 10}} />
                    <Text style={styles.otherButtonText}>Order Management</Text>
                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1/8}}>
                        <Icon name='angle-right' size={30} color='gray'  />
                    </View>
                </Button>

                <Button style={styles.otherButton}>
                    <Icon name='cog' size={30} color='#f66f88' style={{flex: 1/8, marginLeft: 10}} />
                    <Text style={styles.otherButtonText}>Staff Management</Text>
                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1/8}}>
                        <Icon name='angle-right' size={30} color='gray'  />
                    </View>
                </Button>

                <Button style={styles.otherButton}>
                    <Icon name='cog' size={30} color='#f66f88' style={{flex: 1/8, marginLeft: 10}} />
                    <Text style={styles.otherButtonText}>Factory Management</Text>
                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1/8}}>
                        <Icon name='angle-right' size={30} color='gray'  />
                    </View>
                </Button>

                <Button style={styles.otherButton}>
                    <Icon name='cog' size={30} color='#f66f88' style={{flex: 1/8, marginLeft: 10}} />
                    <Text style={styles.otherButtonText}>Report Management</Text>
                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1/8}}>
                        <Icon name='angle-right' size={30} color='gray'  />
                    </View>
                </Button>

                <Button style={styles.otherButton}>
                    <Icon name='mail-reply' size={30} color='#f66f88' style={{flex: 1/8, marginLeft: 10}} />
                    <Text style={styles.otherButtonText}>Logout</Text>
                </Button>

            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent',
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    otherButton: {
        marginTop: 10,
        borderRadius: 0,
        borderWidth: 0.5,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        height: 40,
        width: window.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    otherButtonText: {
        flex: 6/8
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);