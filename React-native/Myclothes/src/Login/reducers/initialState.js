/**
 * Created by vjtc0n on 9/12/16.
 */
const {Record} = require('immutable');
const {
    LOGIN
} = require('../libs/constraints').default;

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
    state: LOGIN,
    disabled: false,
    error: null,
    isValid: false,
    isFetching: false,
    fields: new (Record({
        username: '',
        usernameHasError: false,
        usernameErrorMsg: '',
        email: '',
        emailHasError: false,
        emailErrorMsg: '',
        password: '',
        passwordHasError: false,
        passwordErrorMsg: '',
        passwordAgain: '',
        passwordAgainHasError: false,
        passwordAgainErrorMsg: '',
        showPassword: false
    }))
});

/**
 * ## InitialState
 * The form is set
 */
var InitialState = Record({
    form: new Form()
});
export default InitialState;