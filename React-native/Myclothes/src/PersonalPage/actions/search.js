/**
 * Created by vjtc0n on 9/22/16.
 */
const {
    SEARCH_MEMBER_REQUEST,
    SEARCH_MEMBER_SUCCESS,
    SEARCH_MEMBER_FAILURE
} = require('../libs/constraints').default;

import * as API from '../libs/backend';

export function searchMemberRequest() {
    return {
        type: SEARCH_MEMBER_REQUEST
    }
}

export function searchMemberSuccess(json) {
    return {
        type: SEARCH_MEMBER_SUCCESS,
        payload: json
    }
}

export function searchMemberFailure(error) {
    return {
        type: SEARCH_MEMBER_FAILURE,
        payload: error
    }
}

export function searchMember(token, username) {
    return dispatch => {
        dispatch(searchMemberRequest());
        return API.searchMember(token, username)
            .then((json) => {
                dispatch(searchMemberSuccess(json))
            })
            .catch((error) => {
                dispatch(searchMemberFailure(error))
            })
    }
}