'use strict'

var loopback = require('loopback');
var mongoose = require('mongoose');

module.exports = function(Post) {
  var app = require('../../server/server');

  Post.getPosts = function (user_id, limit, cb) {
    var Member = Post.app.models.Member;
    var Follow =  Post.app.models.Follow;
    Follow.find({
      where: {
        user_id_1: user_id
      },
      fields: {
        user_id_2: true
      }
    }, function (err, follows) {
      if (err) cb(err);
      var tempArray = [];
      tempArray.push(user_id);
      follows.forEach(function (follow) {
        tempArray.push(follow.user_id_2.toString());
      });

      if (!err) {
        Post.find({
          where: {
            user_id: {
              inq: tempArray
            }
          },
          order: 'time DESC',
          include: ['comments','likes', 'shares', 'products', 'member'],
          limit: limit
        }, function (err, posts) {
          if (err) cb(err);
          cb(null, posts);
        });
      }
    })
  };

  Post.remoteMethod(
    'getPosts',
    {
      http: {path: '/getPosts', verb: 'post'},
      accepts: [
        {arg: 'user_id', type: 'string', http: { source: 'query' } },
        {arg: 'limit', type: 'number', http: { source: 'query' } }
      ],
      returns: [
        {arg: 'posts', type: 'object'}
      ]
    }
  );
};
