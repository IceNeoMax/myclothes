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
    GET_SHARE_POST_REQUEST,
    GET_SHARE_POST_SUCCESS,
    GET_SHARE_POST_FAILURE,
    SEND_PRODUCT_TO_SHOPPINGCART,
    SET_REFRESH
} = require('../libs/constraints').default;

const InitialState = require('./initialState').default;
initialState = new InitialState();

export default function personalReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.merge(state);
    //console.log(action.payload)
    switch (action.type) {
        case GET_SHARE_POST_REQUEST:
        case SEARCH_MEMBER_REQUEST:
            return state;
        case SEARCH_MEMBER_SUCCESS:
            return state.setIn(['form', 'searchedMember'], action.payload)
                .setIn(['form', 'error'], null)
                .setIn(['form', 'isFetching'], false);
        case GET_SHARE_POST_FAILURE:
        case SEARCH_MEMBER_FAILURE:
            return state.setIn(['form', 'isFetching'], false)
                .setIn(['form', 'error'], action.payload);
        case GET_SHARE_POST_SUCCESS:
            console.log(action.payload.post.products)
            return state.setIn(['form', 'allPost', 'posts', action.payload.index, 'products'], action.payload.post.products)
        case GET_POST_REQUEST:
            return state;
        case GET_POST_FAILURE:
            return state.setIn(['form', 'isFetching'], false)
                .setIn(['form', 'error'], action.payload);
        case GET_POST_SUCCESS:
            return state.setIn(['form', 'allPost'], action.payload)
                .setIn(['form', 'error'], null)
                .setIn(['form', 'isFetching'], false);
        case SEND_PRODUCT_TO_SHOPPINGCART:
            state.form.shopping_cart.push(action.payload)
            return state
        case SET_REFRESH:
            return state.setIn(['form', 'isRefreshing'], action.payload)
    }


    return state;
}