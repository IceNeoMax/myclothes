/**
 * Created by vjtc0n on 9/7/16.
 */
const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} = require('../../lib/constants');
import {Actions} from 'react-native-router-flux';
const _= require('underscore');


/**
 * ## Login actions
 */
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

export function login(username, password) {
    
}