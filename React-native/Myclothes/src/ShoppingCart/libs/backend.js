/**
 * Created by vjtc0n on 12/8/16.
 */
import _ from 'underscore';
import * as config from '../../store/globalConfig'

var baseUrl = config.baseUrl;

export async function createShoppingCart(user_id, totalPrice) {
    return await this._fetch({
        method: 'POST',
        url: '/ShoppingCarts',
        body: {
            user_id: user_id,
            total: totalPrice
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

export async function createOrder(data) {
    return await this._fetch({
        method: 'POST',
        url: '/Orders',
        body: data
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

export async function getHistory(user_id) {
    return await this._fetch({
        method: 'GET',
        url: '/Members/' + user_id + '/shopping-carts?filter[include][orders]=product&filter[order]=purchase_time%20DESC'
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