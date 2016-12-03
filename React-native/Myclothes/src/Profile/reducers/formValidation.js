/**
 * Created by vjtc0n on 9/21/16.
 */

export default function formValidation (state) {
    console.log(state.form.fields.city)
    if (state.form.fields.username !== '' &&
        state.form.fields.email !== '' &&
        state.form.fields.city !== '' &&
        !state.form.fields.usernameHasError &&
        !state.form.fields.emailHasError
        /*(state.form.fields.username !== state.form.originalProfile.username ||
        state.form.fields.email !== state.form.originalProfile.email)*/
    ) {
        return state.setIn(['form', 'isValid'], true)
    } else {
        return state.setIn(['form', 'isValid'], false)
    }
}
