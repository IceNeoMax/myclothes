'use strict'

var loopback = require('loopback');

module.exports = function(Member) {

  Member.searchForMember = function (user_name, limit, cb) {
    user_name = new RegExp(user_name, "i");
    Member.find({
      where: {
        user_name: user_name
      },
      fields: {
        email: false
      },
      limit: limit
    }, function (error, members) {
      if (error) cb(error);
      if (!error) {
        cb(null, members)
      }
    });
  };

  Member.remoteMethod(
    'searchForMember',
    {
      http: {path: '/searchformember', verb: 'post'},
      accepts: [
        {arg: 'user_name', type: 'string', http: { source: 'query' } },
        {arg: 'limit', type: 'number', http: { source: 'query' } }
      ],
      returns: [
        {arg: 'members', type: 'object'}
      ]
    }
  );


};
