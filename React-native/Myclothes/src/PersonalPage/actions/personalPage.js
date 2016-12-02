/**
 * Created by vjtc0n on 12/2/16.
 */
const {
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
} = require('../libs/constraints').default;

import * as API from '../libs/backend';


export function getPostRequest() {
    return {
        type: GET_POST_REQUEST
    }
}

export function getPostSuccess(json) {
    return {
        type: GET_POST_SUCCESS,
        payload: json
    }
}

export function getPostFailure(error) {
    return {
        type: GET_POST_FAILURE,
        payload: error
    }
}

export function getPosts(user_id, limit) {
    return dispatch => {
        dispatch(getPostRequest());
        return API.getPosts(user_id, limit)
            .then((json) => {
                //console.log(json)
                dispatch(getPostSuccess(json))
            })
            .catch((error) => {
                dispatch(getPostFailure(error))
            })
    }
}