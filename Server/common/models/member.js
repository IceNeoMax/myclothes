'use strict'

var loopback = require('loopback');

module.exports = function(Member) {
  var app = require('../../server/server');

  Member.searchForMember = function (user_name, limit, cb) {
    user_name = new RegExp(user_name, "i");
    Member.find({
      where: {
        user_name: user_name
      },
      fields: {
        //email: false
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

  Member.getStaffRoleId = function (cb) {
    var Role = app.models.Role;
    Role.find({
      where: {
        name: "staff"
      }
    }, function (err, result) {
      if (err) cb(err)
      cb(null, result)
    })
  }

  Member.remoteMethod(
    'getStaffRoleId',
    {
      http: {path: '/getStaffRoleId', verb: 'get'},
      accepts: [

      ],
      returns: [
        {arg: 'result', type: 'object'}
      ]
    }
  );

  Member.deleteStaff = function (user_id, role_id, cb) {
    var RoleMapping = app.models.RoleMapping;
    RoleMapping.destroyAll({
      principalId: user_id,
      roleId: role_id
    }, function (err, info, count) {
      if (err) cb(err)
      cb(null, info, count)
    })
  }

  Member.remoteMethod(
    'deleteStaff',
    {
      http: {path: '/deleteStaff', verb: 'delete'},
      accepts: [
        {arg: 'user_id', type: 'string', http: { source: 'query' } },
        {arg: 'role_id', type: 'string', http: { source: 'query' } }
      ],
      returns: [
        {arg: 'result', type: 'object'}
      ]
    }
  );


};
