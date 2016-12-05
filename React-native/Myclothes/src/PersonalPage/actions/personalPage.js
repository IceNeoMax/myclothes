/**
 * Created by vjtc0n on 12/2/16.
 */
const {
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
    GET_SHARE_POST_REQUEST,
    GET_SHARE_POST_SUCCESS,
    GET_SHARE_POST_FAILURE,
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

export function getSharePostRequest() {
    return {
        type: GET_SHARE_POST_REQUEST
    }
}

export function getSharePostSuccess(json, index) {
    return {
        type: GET_SHARE_POST_SUCCESS,
        payload: {post: json, index: index}
    }
}

export function getSharePostFailure(error) {
    return {
        type: GET_SHARE_POST_FAILURE,
        payload: error
    }
}

export function getSharePost(post_id, index) {
    return dispatch => {
        dispatch(getSharePostRequest());
        return API.getSharePost(post_id)
            .then((json) => {
                //console.log(json.products)
                dispatch(getSharePostSuccess(json, index))
            })
            .catch((error) => {
                dispatch(getSharePostFailure(error))
            })
    }
}