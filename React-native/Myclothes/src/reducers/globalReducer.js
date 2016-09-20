/**
 * Created by vjtc0n on 9/20/16.
 */

const {
    SAVE_GLOBAL_TOKEN
} = require('../Login/libs/constraints');

import InitialState from './globalInitialState';

const initialState = new InitialState();

export default function globalReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.merge(state);
    //console.log(state);
    switch (action.type) {
        case "SAVE_GLOBAL_TOKEN":
            return state.set('token', action.payload);

        return state;
    }

    return state;
}