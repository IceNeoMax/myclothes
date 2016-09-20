/**
 * Created by vjtc0n on 9/20/16.
 */
import { combineReducers } from 'redux';
import authReducer from '../Login/reducers/reducer';
import globalReducer from './globalReducer';

const rootReducer = combineReducers({
    'auth': authReducer,
    'global' : globalReducer
});

export default rootReducer;
