/**
 * Created by vjtc0n on 9/12/16.
 */
const {
    LOGIN,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} = require('../libs/constraints').default;
import Backend from '../libs/backend';
import {Actions} from 'react-native-router-flux'


export function loginState () {
    return {
        type: LOGIN
    }
}

export function loginRequest () {
    return {
        type: LOGIN_REQUEST
    }
}

export function loginSuccess (json) {
    return {
        type: LOGIN_SUCCESS,
        payload: json
    }
}

export function loginFailure (error) {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

export function logoutState () {
    return {
        type: LOGOUT
    }
}

export function login(email, password) {
    return dispatch => {
        dispatch(loginRequest());
        return Backend.loginTest({
            email: email,
            password: password
        })
            .then(function () {
                dispatch(loginSuccess());
            })
            .catch((error) => {
          dispatch(loginFailure(error));
        })
    }
}