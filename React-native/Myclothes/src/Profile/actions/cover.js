/**
 * Created by vjtc0n on 9/28/16.
 */
const {
    UPLOAD_AVATAR_IMAGE_SUCCESS
} = require('../libs/constraints');

import * as API from '../libs/backend';

export function getUploadAvatarImage(urlAvatar) {
    return {
        type: UPLOAD_AVATAR_IMAGE_SUCCESS,
        payload: urlAvatar
    }
}

export function setUploadAvatarImage(urlAvatar) {
    return dispatch(getUploadAvatarImage(urlAvatar))
}