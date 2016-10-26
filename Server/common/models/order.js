module.exports = function(Order) {
  Order.bestSellingByWeek = function (cb) {
    var orderCollection = Order.getDataSource().connector.collection(Order.modelName);
    //console.log(orderCollection)
    var now = new Date();
    orderCollection.aggregate({
        $match: {}
      },
      {
        $group: {
          _id: { "product_id": "$product_id" },
          totalSold: { $sum: "$quantity" }
        }
      },
      function(err, products) {
        if(err) {
          cb(err);
        } else {
          //console.log(products)
          var bestSoldNumber = Math.max.apply(Math,products.map(function(o){return o.totalSold;}));
          //console.log(bestSoldNumber)
          var bestProducts = [];

          products.forEach(function (product) {
            if (product.totalSold == bestSoldNumber) {
              bestProducts.push(product);
            }
          });
          cb(null, bestProducts)

        }
    });
  };

  Order.remoteMethod(
    'bestSellingByWeek',
    {
      http: {path: '/bestsellingbyweek', verb: 'get'},
      returns: [
        {arg: 'products', type: 'object'}
      ]
    }
  );

};
