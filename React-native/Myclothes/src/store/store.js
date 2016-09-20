/**
 * Created by vjtc0n on 9/12/16.
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import devTools from 'remote-redux-devtools';
import { Platform } from 'react-native';

/**
 * ## Reducer
 * The reducer contains the all reducers
 */
import rootReducer from '../reducers/index';

/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 *
 */
export default function configureStore (initialState) {
    const enhancer = compose(
        applyMiddleware(thunk),
        devTools()
    );
    const store = createStore(rootReducer, initialState, enhancer);
    devTools.updateStore(store);
    return store;
};
