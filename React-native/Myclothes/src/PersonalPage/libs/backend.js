/**
 * Created by vjtc0n on 9/22/16.
 */
import _ from 'underscore';
const API_BASE_URL = 'http://192.168.1.73:3000/api';


export  async function getPosts(user_id, limit) {
    return await this._fetch({
        method: 'POST',
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

    let url = API_BASE_URL + opts.url;
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