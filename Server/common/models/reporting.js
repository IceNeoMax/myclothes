module.exports = function(Reporting) {
  Reporting.checkReport = function (comment_id, user_id, cb) {
    Reporting.count({
      comment_id: comment_id,
      user_id: user_id
    }, function (err, count) {
      if (err) cb(err);
      cb(null, count)
    })
  };

  Reporting.remoteMethod(
    'checkReport',
    {
      http: {path: '/checkReport', verb: 'get'},
      accepts: [
        {arg: 'comment_id', type: 'string', http: { source: 'query' } },
        {arg: 'user_id', type: 'string', http: { source: 'query' } }
      ],
      returns: [
        {arg: 'result', type: 'object'}
      ]
    }
  );
};
