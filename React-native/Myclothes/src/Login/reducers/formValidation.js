/**
 * Created by vjtc0n on 9/12/16.
 */
const {
    LOGIN
} = require('../libs/constraints').default;

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
    }
}