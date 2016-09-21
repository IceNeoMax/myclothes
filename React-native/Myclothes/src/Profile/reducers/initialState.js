/**
 * Created by vjtc0n on 9/21/16.
 */
const {Record} = require('immutable');

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 *
 * The originalProfile is what Parse.com provided and has the objectId
 * The fields are what display on the UI
 */
const Form = Record({
    originalProfile: new (Record({
        username: null,
        email: null,
        objectId: null,
        emailVerified: null
    })),
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
        emailVerified: false
    }))
});

var InitialState = Record({
    form: new Form()
});

export default InitialState;