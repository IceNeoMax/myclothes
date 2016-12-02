/**
 * Created by vjtc0n on 9/12/16.
 */
const {
    LOGIN,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    ON_AUTH_FORM_FIELD_CHANGE,
    LOGOUT,
    SAVE_MEMBER_TOKEN,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    REGISTER
} = require('../libs/constraints').default ;
import InitialState from './initialState';
import formValidation from './formValidation';
import fieldValidation from '../libs/fieldValidation';

const initialState = new InitialState();

export default function authReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
    //console.log(action.type);
    //console.log(state);
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            return formValidation(
                state.setIn(['form', 'state'], action.type)
                    .setIn(['form', 'error'], null)
            );
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
            let nextState = state.setIn(['form', 'isFetching'], true)
                .setIn(['form', 'error'], null);
            return nextState;
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return state.setIn(['form', 'isFetching'], false);
        case SIGNUP_FAILURE:
        case LOGIN_FAILURE:
            return state.setIn(['form', 'isFetching'], false)
                .setIn(['form', 'error'], action.payload);
        case LOGOUT:
            return formValidation(
                state.setIn(['form', 'state'], action.type)
                    .setIn(['form', 'error'], null)
                    .setIn(['form', 'fields', 'username'], '')
                    .setIn(['form', 'fields', 'email'], '')
                    .setIn(['form', 'fields', 'password'], '')
                    .setIn(['form', 'fields', 'passwordAgain'], '')
                    .setIn(['form', 'fields', 'memberToken'], '')
            );
        case ON_AUTH_FORM_FIELD_CHANGE: {
            const {field, value} = action.payload;
            let nextState = state.setIn(['form', 'fields', field], value)
                .setIn(['form', 'error'], null);
            //console.log(action.type);
            return formValidation(
                fieldValidation(nextState, action)
                , action);
        }
            return state;

    }
    return state;
}