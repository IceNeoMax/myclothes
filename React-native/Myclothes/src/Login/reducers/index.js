/**
 * Created by vjtc0n on 9/7/16.
 */
import auth from './auth/authReducer'
import device from './device/deviceReducer'
import global from './global/globalReducer'
//import profile from './profile/profileReducer';

import { combineReducers } from 'redux';

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
    auth,
    device,
    global
    //profile
});

export default rootReducer;