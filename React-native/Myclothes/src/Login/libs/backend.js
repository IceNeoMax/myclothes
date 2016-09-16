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
    

    async _fetch (opts) {

    }
}

module.exports = Backend;