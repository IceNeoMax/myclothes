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
    SAVE_GLOBAL_TOKEN,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    REGISTER
} = require('../libs/constraints').default;
import * as API from '../libs/backend';
import {Actions} from 'react-native-router-flux'


export function loginState () {
    return {
        type: LOGIN
    }
}

export function registerState () {
    return {
        type: REGISTER
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

export function saveGlobalToken(token, userId) {
    return {
        type: SAVE_GLOBAL_TOKEN,
        payload: {
            token: token,
            userId: userId
        }
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
                //dispatch(saveMemberToken(json.id));
                dispatch(saveGlobalToken(json));
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

export function signupRequest () {
    return {
        type: SIGNUP_REQUEST
    }
}
export function signupSuccess (json) {
    return {
        type: SIGNUP_SUCCESS,
        payload: json
    }
}
export function signupFailure (error) {
    return {
        type: SIGNUP_FAILURE,
        payload: error
    }
}

export function signup (user_name, email, password) {
    return dispatch => {
        dispatch(signupRequest());
        return API.signup({
            user_name: user_name,
            email: email,
            password: password
        })
            .then(function (json) {
                dispatch(signupSuccess(json));
                dispatch(login(email, password))
            })
            .catch((error) => {
                if (error.error.statusCode) {
                    error = 'Email already exists';
                    dispatch(signupFailure(error))
                } else {
                    dispatch(signupFailure(error))
                }
            })
    }
}