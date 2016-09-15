/**
 * Created by vjtc0n on 9/12/16.
 */
import { combineReducers } from 'redux';
import authReducer from './reducer';

const loginReducer = combineReducers({
    'auth': authReducer
});

export default loginReducer;