module.exports = function(Sticker) {
  Sticker.createSticker = function (data, cb) {
    //console.log(data);
    //console.log(JSON.parse(data));
    Sticker.create(JSON.parse(data),
      function (err, result) {
        if (err) cb(err);
        cb(null, result)
    })
  };

  Sticker.remoteMethod(
    'createSticker',
    {
      http: {path: '/createSticker', verb: 'post'},
      accepts: [
        {arg: 'data', type: 'string', http: { source: 'query' } }
      ],
      returns: [
        {arg: 'result', type: 'object'}
      ]
    }
  );
};
