/**
 * Created by vjtc0n on 9/7/16.
 */
const {
    SET_PLATFORM,
    SET_VERSION
} = require('../../lib/constants').default;

/**
 * ## Set the platformState
 *
 */
export function setPlatform (platform) {
    return {
        type: SET_PLATFORM,
        payload: platform
    }
}
/**
 * ## set the version
 *
 */
export function setVersion (version) {
    return {
        type: SET_VERSION,
        payload: version
    }
}