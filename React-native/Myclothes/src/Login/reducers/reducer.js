/**
 * Created by vjtc0n on 9/12/16.
 */
const {
    LOGIN,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    ON_AUTH_FORM_FIELD_CHANGE
} = require('../libs/constraints').default ;
import initialState from './initialState';
import formValidation from './formValidation';
import fieldValidation from '../libs/fieldValidation';

export default function authReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

    switch (action.type) {
        case LOGIN:
        case LOGIN_REQUEST:
        case LOGIN_SUCCESS:
        case LOGIN_FAILURE:
        case ON_AUTH_FORM_FIELD_CHANGE: {
            const {field, value} = action.payload;
            let nextState = state.setIn(['form', 'fields', field], value)
                .setIn(['form', 'error'], null);

            return formValidation(
                fieldValidation(nextState, action)
                , action);
        }
            return state;
    }
    return state;
}