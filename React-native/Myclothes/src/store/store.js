/**
 * Created by vjtc0n on 9/12/16.
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import devTools from 'remote-redux-devtools';

/**
 * ## Reducer
 * The reducer contains the all reducers
 */
import reducer from '../reducers/reducers';

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
    const store = createStore(reducer, initialState, enhancer);
    devTools.updateStore(store);
    return store;
};
