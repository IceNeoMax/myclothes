/**
 * Created by vjtc0n on 9/21/16.
 */
import fieldValidation from '../libs/fieldValidation';
import formValidation from './formValidation';

const {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    ON_PROFILE_FORM_FIELD_CHANGE,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAILURE,
    UPLOAD_AVATAR_IMAGE_SUCCESS
} = require('../libs/constraints').default;

const InitialState = require('./initialState').default;
const initialState = new InitialState();

export default function profileReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
    console.log(action.type);
    switch (action.type) {
        case GET_PROFILE_REQUEST:
            return state;
        case GET_PROFILE_SUCCESS:
            let nextProfileState = state.setIn(['form', 'isFetching'], false)
                .setIn(['form', 'fields', 'username'], action.payload.user_name)
                .setIn(['form', 'fields', 'email'], action.payload.email)
                .setIn(['form', 'fields', 'city'], action.payload.city)
                .setIn(['form', 'fields', 'avatar_picture'], action.payload.avatar_picture)
                .setIn(['form', 'fields', 'cover_picture'], action.payload.cover_picture)
                .setIn(['form', 'originalProfile', 'username'], action.payload.user_name)
                .setIn(['form', 'originalProfile', 'email'], action.payload.email)
                .setIn(['form', 'error'], null);

            return formValidation(
                fieldValidation(nextProfileState, action)
                , action);
        case GET_PROFILE_FAILURE:
            return state.setIn(['form', 'error'], action.payload);
        case ON_PROFILE_FORM_FIELD_CHANGE:
            const {field, value} = action.payload;
            let nextState = state.setIn(['form', 'fields', field], value)
                .setIn(['form', 'error'], null);

            return formValidation(
                fieldValidation(nextState, action)
                , action);

        case PROFILE_UPDATE_REQUEST:
            return state.setIn(['form', 'isFetching'], true)
                .setIn(['form', 'error'], null);
        case PROFILE_UPDATE_SUCCESS:
            return state.setIn(['form', 'isFetching'], false);
        case PROFILE_UPDATE_FAILURE:
            return state.setIn(['form', 'isFetching'], false)
                .setIn(['form', 'error'], action.payload)
        case UPLOAD_AVATAR_IMAGE_SUCCESS:
            return state.setIn(['form', 'fields', 'avatar_picture'], action.payload.urlAvatar)
    }
    return state;
}