/**
 * Created by vjtc0n on 9/12/16.
 */
const {
    LOGIN,
    REGISTER
} = require('../libs/constraints').default;

export default function formValidation (state) {
    switch (state.form.state) {
        case LOGIN:
            if (state.form.fields.email !== '' &&
                state.form.fields.password !== '' &&
                !state.form.fields.emailHasError &&
                !state.form.fields.passwordHasError) {
                return state.setIn(['form', 'isValid'], true)
            } else {
                return state.setIn(['form', 'isValid'], false)
            }
        case REGISTER:
            if (state.form.fields.username !== '' &&
                state.form.fields.email !== '' &&
                state.form.fields.password !== '' &&
                state.form.fields.passwordAgain !== '' &&
                !state.form.fields.usernameHasError &&
                !state.form.fields.emailHasError &&
                !state.form.fields.passwordHasError &&
                !state.form.fields.passwordAgainHasError) {
                return state.setIn(['form', 'isValid'], true)
            } else {
                return state.setIn(['form', 'isValid'], false)
            }
            
    }

    return state;
}