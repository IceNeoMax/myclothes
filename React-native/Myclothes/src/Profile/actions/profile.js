/**
 * Created by vjtc0n on 9/21/16.
 */
const {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    ON_PROFILE_FORM_FIELD_CHANGE,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAILURE
} = require('../libs/constraints').default;

import * as API from '../libs/backend';

export function getProfileRequest () {
    return {
        type: GET_PROFILE_REQUEST
    }
}
export function getProfileSuccess (json) {
    return {
        type: GET_PROFILE_SUCCESS,
        payload: json
    }
}
export function getProfileFailure (error) {
    return {
        type: GET_PROFILE_FAILURE,
        payload: error
    }
}
export function onProfileFormFieldChange (field, value) {
    return {
        type: ON_PROFILE_FORM_FIELD_CHANGE,
        payload: {field: field, value: value}
    }
}

export function getProfile(token, userId) {
    return dispatch => {
        dispatch(getProfileRequest());
        return API.getProfile(token, userId)
            .then((json) => {
                dispatch(getProfileSuccess(json))
            })
            .catch((error) => {
                dispatch(getProfileFailure(error))
            })
    }
}

export function profileUpdateRequest () {
    return {
        type: PROFILE_UPDATE_REQUEST
    }
}
export function profileUpdateSuccess () {
    return {
        type: PROFILE_UPDATE_SUCCESS
    }
}
export function profileUpdateFailure (error) {
    return {
        type: PROFILE_UPDATE_FAILURE,
        payload: error
    }
}

export function updateProfile(token, userId, data) {
    return dispatch => {
        dispatch(profileUpdateRequest());
        return API.updateProfile(token, userId, data)
            .then(() => {
                dispatch(profileUpdateSuccess());
                dispatch(getProfile(token, userId))
            })
            .catch((error) => {
                dispatch(profileUpdateFailure(error))
            })
    }
}