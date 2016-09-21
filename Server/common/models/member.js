'use strict'

var loopback = require('loopback');


module.exports = function(Member) {

  Member.searchForMember = function (user_name, cb) {
    Member.find({
      where: {
        user_name: user_name
      },
      fields: {
        email: false
      }}, function (error, members) {
      if (error) cb(error);
      if (!error) {
        cb(null, members)
      }
    });
  };

  Member.remoteMethod(
    'searchForMember',
    {
      http: {path: '/searchformember', verb: 'get'},
      accepts: {arg: 'user_name', type: 'string', http: { source: 'query' } },
      returns: [
        {arg: 'members', type: 'object'}
      ]
    }
  );

};
