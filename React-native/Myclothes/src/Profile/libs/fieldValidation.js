/**
 * Created by vjtc0n on 9/21/16.
 */
/**
 * Created by vjtc0n on 9/12/16.
 */
import validate from 'validate.js'
import _ from 'underscore'


const emailConstraints = {
    from: {
        email: true
    }
};

/**
 * ## username validation rule
 * read the message.. ;)
 */
const usernamePattern = /^[a-zA-Z0-9]{6,12}$/;
const usernameConstraints = {
    username: {
        format: {
            pattern: usernamePattern,
            flags: 'i'
        }
    }
};

/**
 * ## password validation rule
 * read the message... ;)
 */
const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;
const passwordConstraints = {
    password: {
        format: {
            pattern: passwordPattern,
            flags: 'i'
        }
    }
};

const passwordAgainConstraints = {
    confirmPassword: {
        equality: 'password'
    }
};

export default function fieldValidation (state, action) {
    const {field, value} = action.payload;
    switch (field) {
        case ('email'):
            let validEmail = _.isUndefined(validate({from: value},
                emailConstraints));
            if (validEmail) {
                return state.setIn(['form', 'fields', 'emailHasError'], false)
            } else {
                return state.setIn(['form', 'fields', 'emailHasError'], true)
                    .setIn(['form', 'fields', 'emailErrorMsg'],
                        'Provide valid email')
            }
        case ('username'):
            let validUsername = _.isUndefined(validate({username: value},
                usernameConstraints));
            if (validUsername) {
                return state.setIn(['form', 'fields', 'usernameHasError'],
                    false)
                    .setIn(['form', 'fields', 'usernameErrorMsg'], '')
            } else {
                return state.setIn(['form', 'fields', 'usernameHasError'], true)
                    .setIn(['form', 'fields', 'usernameErrorMsg'],
                        '6-12 in length with letters or numbers')
            }
        case ('city'):
            return state
        case ('country'):
            return state
        case ('dateOfBirth'):
            return state
    }
    return state;
}