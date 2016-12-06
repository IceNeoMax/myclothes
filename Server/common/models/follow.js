module.exports = function(Follow) {
  Follow.deleteFollow = function (user_id_1, user_id_2, cb) {
    Follow.destroyAll({
      user_id_1: user_id_1,
      user_id_2: user_id_2
    }, function (err, info, count) {
      if (err) cb(err);
      cb(null, info, count)
    })
  };

  Follow.remoteMethod(
    'deleteFollow',
    {
      http: {path: '/deleteFollow', verb: 'delete'},
      accepts: [
        {arg: 'user_id_1', type: 'string', http: { source: 'query' } },
        {arg: 'user_id_2', type: 'string', http: { source: 'query' } }
      ],
      returns: [
        {arg: 'result', type: 'object'}
      ]
    }
  );
};
