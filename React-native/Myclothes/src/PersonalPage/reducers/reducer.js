/**
 * Created by vjtc0n on 9/22/16.
 */

const {
    SEARCH_MEMBER_REQUEST,
    SEARCH_MEMBER_SUCCESS,
    SEARCH_MEMBER_FAILURE,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
} = require('../libs/constraints').default;

const InitialState = require('./initialState').default;
initialState = new InitialState();


export default function personalReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.merge(state);

    switch (action.type) {
        case SEARCH_MEMBER_REQUEST:
            return state;
        case SEARCH_MEMBER_SUCCESS:
            return state.setIn(['form', 'searchedMember'], action.payload)
                .setIn(['form', 'error'], null)
                .setIn(['form', 'isFetching'], false);
        case SEARCH_MEMBER_FAILURE:
            return state.setIn(['form', 'isFetching'], false)
                .setIn(['form', 'error'], action.payload);

        case GET_POST_REQUEST:
            return state;
        case GET_POST_FAILURE:
            return state.setIn(['form', 'isFetching'], false)
                .setIn(['form', 'error'], action.payload);
        case GET_POST_SUCCESS:
            return state.setIn(['form', 'allPost'], action.payload)
                .setIn(['form', 'error'], null)
                .setIn(['form', 'isFetching'], false);
    }


    return state;
}