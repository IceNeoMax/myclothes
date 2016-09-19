/**
 * Created by vjtc0n on 9/12/16.
 */
import _ from 'underscore';

const API_BASE_URL = 'http://192.168.1.73:3000/api';

export async function login(data) {
    console.log(data);
    return await this._fetch({
            method: 'POST',
            url: '/Members/login',
            body: data
        })
        .then((res) => {
            console.log(res);
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

    if (opts.method === 'POST' || opts.method === 'PUT') {
        //reqOpts.headers['Accept'] = 'application/json';
        reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (opts.body) {
        reqOpts.body = JSON.stringify(opts.body)
    }

    let url = API_BASE_URL + opts.url;
    let res = {};

    console.log(url);
    console.log(reqOpts);

    let response = await fetch(url, reqOpts);
    console.log(response);
    res.status = response.status;
    res.code = response.code;

    return response.json()
        .then((json) => {
            res.json = json;
            return res
        })
}


