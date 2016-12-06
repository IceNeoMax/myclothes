module.exports = function(Like) {
  Like.deletePost = function (post_id, user_id, cb) {
    Like.destroyAll({
      post_id: post_id,
      user_id: user_id
    }, function (err, info, count) {
      if (err) cb(err);
      cb(null, info, count)
    })
  };

  Like.remoteMethod(
    'deletePost',
    {
      http: {path: '/deletePost', verb: 'delete'},
      accepts: [
        {arg: 'post_id', type: 'string', http: { source: 'query' } },
        {arg: 'user_id', type: 'string', http: { source: 'query' } }
      ],
      returns: [
        {arg: 'result', type: 'object'}
      ]
    }
  );

  Like.deleteProduct = function (product_id, user_id, cb) {
    Like.destroyAll({
      product_id: product_id,
      user_id: user_id
    }, function (err, info, count) {
      if (err) cb(err);
      cb(null, info, count)
    })
  };

  Like.remoteMethod(
    'deleteProduct',
    {
      http: {path: '/deleteProduct', verb: 'delete'},
      accepts: [
        {arg: 'product_id', type: 'string', http: { source: 'query' } },
        {arg: 'user_id', type: 'string', http: { source: 'query' } }
      ],
      returns: [
        {arg: 'result', type: 'object'}
      ]
    }
  );

  Like.countProduct = function (product_id, user_id, cb) {
    Like.count({
      product_id: product_id,
      user_id: user_id
    }, function (err, count) {
      if (err) cb(err);
      cb(null, count)
    })
  };

  Like.remoteMethod(
    'countProduct',
    {
      http: {path: '/countProduct', verb: 'get'},
      accepts: [
        {arg: 'product_id', type: 'string', http: { source: 'query' } },
        {arg: 'user_id', type: 'string', http: { source: 'query' } }
      ],
      returns: [
        {arg: 'result', type: 'object'}
      ]
    }
  );

  Like.countPost = function (post_id, user_id, cb) {
    Like.count({
      post_id: post_id,
      user_id: user_id
    }, function (err, count) {
      if (err) cb(err);
      cb(null, count)
    })
  };

  Like.remoteMethod(
    'countPost',
    {
      http: {path: '/countPost', verb: 'get'},
      accepts: [
        {arg: 'post_id', type: 'string', http: { source: 'query' } },
        {arg: 'user_id', type: 'string', http: { source: 'query' } }
      ],
      returns: [
        {arg: 'result', type: 'object'}
      ]
    }
  );

};
