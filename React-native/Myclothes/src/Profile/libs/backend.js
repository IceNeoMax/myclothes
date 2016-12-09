/**
 * Created by vjtc0n on 9/21/16.
 */

import _ from 'underscore';
import * as config from '../../store/globalConfig'

var baseUrl = config.baseUrl;


export async function getProfile(token, userId) {
    return await this._fetch({
            method: 'GET',
            url: '/Members/' + userId + '?access_token=' + token
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

export async function updateProfile(token, userId, data) {
    return await this._fetch({
            method: 'PATCH',
            url: '/Members/' + userId + '?access_token=' + token,
            body: data
        })
        .then((res) => {
            if ((res.status === 200 || res.status === 201)) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function addStaffRole(user_id, role_id) {
    return await this._fetch({
        method: 'POST',
        url: '/RoleMappings',
        body: {
            principalId: user_id,
            roleId: role_id
        }
    })
        .then((res) => {
            if ((res.status === 200 || res.status === 201)) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function deleteStaff(user_id, role_id) {
    return await this._fetch({
        method: 'DELETE',
        url: '/Members/deleteStaff?user_id=' + user_id + '&role_id=' + role_id
    })
        .then((res) => {
            if ((res.status === 200 || res.status === 201)) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function checkStaff(user_id) {
    return await this._fetch({
        method: 'GET',
        url: '/Members/' + user_id + '/roles'
    })
        .then((res) => {
            if ((res.status === 200 || res.status === 201)) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function getRoleMapping() {
    return await this._fetch({
        method: 'GET',
        url: '/RoleMappings'
    })
        .then((res) => {
            if ((res.status === 200 || res.status === 201)) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function getStaffRoleId() {
    return await this._fetch({
        method: 'GET',
        url: '/Members/getStaffRoleId'
    })
        .then((res) => {
            //console.log(res)
            if ((res.status === 200 || res.status === 201)) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function getUserInfo(user_id) {
    return await this._fetch({
        method: 'GET',
        url: '/Members/' + user_id + '?filter[include]=factory'
    })
        .then((res) => {
            if ((res.status === 200 || res.status === 201)) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function createFactory(data) {
    return await this._fetch({
        method: 'POST',
        url: '/factories',
        body: data
    })
        .then((res) => {
            if ((res.status === 200 || res.status === 201)) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function updateFactory(factory_id, data) {
    return await this._fetch({
        method: 'PATCH',
        url: '/factories/' + factory_id,
        body: data
    })
        .then((res) => {
            if ((res.status === 200 || res.status === 201)) {
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
    //console.log(url)
    let res = {};

    let response = await fetch(url, reqOpts);
    //console.log(response);
    res.status = response.status;
    res.code = response.code;

    return response.json()
        .then((json) => {
            res.json = json;
            return res
        })
}


