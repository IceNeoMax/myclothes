/**
 * Created by vjtc0n on 9/7/16.
 */
const {
    LOGOUT,
    REGISTER,
    LOGIN,
    FORGOT_PASSWORD
} = require('../../lib/constants').default;

export default function formValidation (state) {
    switch (state.form.state) {
        case LOGIN:
            if (state.form.fields.username !== '' &&
                state.form.fields.password !== '' &&
                !state.form.fields.usernameHasError &&
                !state.form.fields.passwordHasError) {
                return state.setIn(['form', 'isValid'], true)
            } else {
                return state.setIn(['form', 'isValid'], false)
            }
        case LOGOUT:
            return;
        case REGISTER:
            return;
        case FORGOT_PASSWORD:
            return;
    }
    return state;
}