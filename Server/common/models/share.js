module.exports = function(Share) {
  Share.countPost = function (post_id, user_id, cb) {
    Share.count({
      post_id: post_id,
      user_id: user_id
    }, function (err, count) {
      if (err) cb(err);
      cb(null, count)
    })
  };

  Share.remoteMethod(
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
