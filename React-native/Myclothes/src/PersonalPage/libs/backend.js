/**
 * Created by vjtc0n on 9/22/16.
 */
import _ from 'underscore';
import * as config from '../../store/globalConfig'

var baseUrl = config.baseUrl;

export  async function getPosts(user_id, limit) {
    return await this._fetch({
        method: 'GET',
        url: '/Posts/getPosts?user_id=' + user_id + '&limit=' + limit
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function searchMember(token, username, limit) {
    return await this._fetch({
            method: 'POST',
            url: '/Members/searchformember?user_name=' + username + '&limit=' + limit + '&access_token=' + token
        })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function getSharePost(post_id) {
    return await this._fetch({
        method: 'GET',
        url: '/Posts/' + post_id + '?filter[include]=products&filter[include]=member&filter[include]=likes&filter[include]=shares&filter[include]=comments'
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function getLikesPost(post_id) {
    return await this._fetch({
        method: 'GET',
        url: '/Posts/' + post_id + '/likes/count'
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function getLikesProduct(product_id) {
    return await this._fetch({
        method: 'GET',
        url: '/Products/' + product_id + '/likes/count'
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function checkLikeProduct(product_id, user_id) {
    return await this._fetch({
        method: 'GET',
        url: '/likes/countProduct?product_id=' + product_id + '&user_id=' + user_id
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function checkLikePost(post_id, user_id) {
    return await this._fetch({
        method: 'GET',
        url: '/likes/countPost?post_id=' + post_id + '&user_id=' + user_id
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function countSharePost(post_id) {
    return await this._fetch({
        method: 'GET',
        url: '/Posts/' + post_id + '/shares/count'
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function countCommentPost(post_id) {
    return await this._fetch({
        method: 'GET',
        url: '/Posts/' + post_id + '/comments/count'
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function countCommentProduct(product_id) {
    return await this._fetch({
        method: 'GET',
        url: '/Products/' + product_id + '/comments/count'
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function getCommentPost(post_id) {
    return await this._fetch({
        method: 'GET',
        url: '/Posts/' + post_id + '/comments?filter[order]=time%20DESC&filter[include]=member'
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function getCommentProduct(product_id) {
    return await this._fetch({
        method: 'GET',
        url: '/Products/' + product_id + '/comments?filter[order]=time%20DESC&filter[include]=member'
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function addCommentPost(post_id, user_id, content) {
    return await this._fetch({
        method: 'POST',
        url: '/comments',
        body: {
            post_id: post_id,
            user_id: user_id,
            content: content
        }
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function addCommentProduct(product_id, user_id, content) {
    return await this._fetch({
        method: 'POST',
        url: '/comments',
        body: {
            product_id: product_id,
            user_id: user_id,
            content: content
        }
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function likePost(post_id, user_id) {
    return await this._fetch({
        method: 'POST',
        url: '/likes',
        body: {
            post_id: post_id,
            user_id: user_id
        }
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function likeProduct(product_id, user_id) {
    return await this._fetch({
        method: 'POST',
        url: '/likes',
        body: {
            product_id: product_id,
            user_id: user_id
        }
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function unlikeProduct(product_id, user_id) {
    return await this._fetch({
        method: 'DELETE',
        url: '/likes/deleteProduct?product_id=' + product_id + '&user_id=' + user_id
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function createShareRelation(post_id, user_id) {
    return await this._fetch({
        method: 'POST',
        url: '/shares',
        body: {
            post_id: post_id,
            user_id: user_id
        }
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function createSharePost(post_id, user_id) {
    return await this._fetch({
        method: 'POST',
        url: '/Posts',
        body: {
            share_id: post_id,
            user_id: user_id
        }
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function unlikePost(post_id, user_id) {
    return await this._fetch({
        method: 'DELETE',
        url: '/likes/deletePost?post_id=' + post_id + '&user_id=' + user_id
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function _fetch (opts) {
    opts = _.extend({
        method: 'GET',
        url: null,
        body: null,
        callback: null
    }, opts);

    var reqOpts = {
        method: opts.method,
        headers: {
        }
    };

    if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'PATCH') {
        reqOpts.headers['Accept'] = 'application/json';
        reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (opts.body) {
        reqOpts.body = JSON.stringify(opts.body)
    }

    let url = baseUrl + opts.url;
    let res = {};

    let response = await fetch(url, reqOpts);
    

    res.status = response.status;
    res.code = response.code;

    return response.json()
        .then((json) => {
            res.json = json;
            return res
        })
}