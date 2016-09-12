/**
 * Created by vjtc0n on 9/12/16.
 */
import _ from 'underscore';
class Backend {
    async login (data) {
        return await this._fetch({
                method: 'POST',
                url: '/account/login',
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

    async loginTest (data) {
        if ((data.email == 'khanh12345') && (data.password == 'khanh12345')) {
            return true;
        } else
            return false;
    }

    async _fetch (opts) {

    }
}

module.exports = Backend;