module.exports = function(Factory) {
  Factory.getOrders = function (factory_id, cb) {
    Factory.findById(factory_id, {
      include: {
        relation: 'orders',
        scope: {
          where: {
            accepted: false
          },
          include: [
            {relation: 'product'},
            {relation: 'member'},
            {relation: 'shoppingCart'}
          ]
        }
      }
    },
      function (err, result) {
        if (err) cb(err);
        cb(null, result)
      })
  };

  Factory.remoteMethod(
    'getOrders',
    {
      http: {path: '/getOrders', verb: 'get'},
      accepts: [
        {arg: 'factory_id', type: 'string', http: { source: 'query' } }
      ],
      returns: [
        {arg: 'result', type: 'object'}
      ]
    }
  );
};
