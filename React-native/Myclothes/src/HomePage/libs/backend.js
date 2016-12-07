/**
 * Created by vjtc0n on 12/7/16.
 */
import _ from 'underscore';
import * as config from '../../store/globalConfig'

var baseUrl = config.baseUrl;


export async function getNewestProducts() {
    return await this._fetch({
        method: 'GET',
        url: '/Products?filter[include]=member&filter[include]=likes&filter[include]=comments&filter[include]=orders&filter[order]=time%20DESC'
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

export async function getBestWeekProducts() {
    return await this._fetch({
        method: 'GET',
        url: '/Orders/bestsellingbyweek'
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

export async function getBestMonthProducts() {
    return await this._fetch({
        method: 'GET',
        url: '/Orders/bestSellingByMonth'
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

export async function getTop10Products() {
    return await this._fetch({
        method: 'GET',
        url: '/Orders/bestSellingTop10'
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

export async function getProductInfo(product_id) {
    return await this._fetch({
        method: 'GET',
        url: '/Products/' + product_id + '?filter[include]=member&filter[include]=likes&filter[include]=comments&filter[include]=orders'
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