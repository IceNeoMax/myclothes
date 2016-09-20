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
    SAVE_GLOBAL_TOKEN
} = require('../libs/constraints').default;
import * as API from '../libs/backend';
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

export function saveMemberToken(token) {
    return {
        type: SAVE_MEMBER_TOKEN,
        payload: token
    }
}

export function saveGlobalToken(token) {
    console.log('saveGlobalToken');
    return {
        type: SAVE_GLOBAL_TOKEN,
        payload: token
    }
}

export function login(email, password) {
    return dispatch => {
        dispatch(loginRequest());
        return API.login({
            email: email,
            password: password
        })
            .then(function (json) {
                dispatch(loginSuccess(json));
                // save member'token logged in
                dispatch(saveMemberToken(json.id));
                dispatch(saveGlobalToken(json.id));
                // navigate to HomePage
                Actions.Tabbar();
                dispatch(logoutState());
            })
            .catch((error) => {
          dispatch(loginFailure(error));
        })
    }
}
export function onAuthFormFieldChange (field, value) {
    return {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: field, value: value}
    }
}