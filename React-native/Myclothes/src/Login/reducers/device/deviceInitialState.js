/**
 * Created by vjtc0n on 9/7/16.
 */
import {Record} from 'immutable';

/**
 * ## InitialState
 *
 * The fields we're concerned with
 */
var InitialState = Record({
    isMobile: false,
    platform: '',
    version: null
});

export default InitialState;