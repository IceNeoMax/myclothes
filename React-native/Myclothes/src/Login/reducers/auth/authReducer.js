/**
 * Created by vjtc0n on 9/7/16.
 */
const InitialState = require('./authInitialState').default;
const fieldValidation = require('../../lib/fieldValidation').default;
const formValidation = require('./authFormValidation').default;

const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN
} = require('../../lib/constants');

const initialState = new InitialState();

export default function authReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
    switch (action.type) {
        case LOGIN:
        case LOGIN_REQUEST:
        case LOGIN_SUCCESS:
        case LOGIN_FAILURE:
    }
    return state;
}