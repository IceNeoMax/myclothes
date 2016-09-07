/**
 * Created by vjtc0n on 9/7/16.
 */
const {Record} = require('immutable');
const {
    REGISTER
} = require('../../lib/constants').default;

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
    state: REGISTER,
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