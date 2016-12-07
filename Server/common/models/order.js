var moment = require('moment');
var _ = require('underscore');


module.exports = function(Order) {
  Order.bestSellingByWeek = function (cb) {
    var orderCollection = Order.getDataSource().connector.collection(Order.modelName);
    //console.log(orderCollection)
    var thisDayMoment = moment(new Date().toISOString());
    var mondayOftheWeek = thisDayMoment.millisecond(0).second(0).minute(0).hour(0).weekday(0)._d.toISOString();
    //console.log(mondayOftheWeek);
    orderCollection.aggregate({
        $match: {
          order_time : { $gte: new Date(mondayOftheWeek)}
        }
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
          console.log(products)
          var bestSoldNumber = Math.max.apply(Math,products.map(function(o){return o.totalSold;}));
          //console.log(bestSoldNumber)
          var bestProducts = _.where(products, {
            totalSold: bestSoldNumber
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


  Order.finding = function (cb) {
    var thisDayMoment = moment(new Date().toISOString());
    var mondayOftheWeek = thisDayMoment.millisecond(0).second(0).minute(0).hour(0).weekday(0)._d.toISOString();
    console.log(mondayOftheWeek);
    Order.find({
        order_time : { gte: mondayOftheWeek}
    },
    function (err, orders) {
      if (err) cb(err);
      cb(null, orders);
    })
  };

  Order.remoteMethod(
    'finding',
    {
      http: {path: '/finding', verb: 'get'},
      returns: [
        {arg: 'orders', type: 'object'}
      ]
    }
  );

  Order.bestSellingByMonth = function (cb) {
    var orderCollection = Order.getDataSource().connector.collection(Order.modelName);
    //console.log(orderCollection)
    mondayOftheMonth = moment().startOf("month").toISOString();
    console.log(mondayOftheMonth);
    orderCollection.aggregate({
        $match: {
          order_time : { $gte: new Date(mondayOftheMonth)}
        }
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
          var bestProducts = _.where(products, {
            totalSold: bestSoldNumber
          });
          cb(null, bestProducts)

        }
      });
  };

  Order.remoteMethod(
    'bestSellingByMonth',
    {
      http: {path: '/bestSellingByMonth', verb: 'get'},
      returns: [
        {arg: 'products', type: 'object'}
      ]
    }
  );

  Order.bestSellingTop10 = function (cb) {
    var orderCollection = Order.getDataSource().connector.collection(Order.modelName);
    //console.log(orderCollection)
    orderCollection.aggregate(
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
          var bestProducts = _.sortBy(products, 'totalSold').reverse().slice(0, 10);
          /*console.log('Array after sort')
          console.log(bestProducts)*/
          cb(null, bestProducts)

        }
      });
  };

  Order.remoteMethod(
    'bestSellingTop10',
    {
      http: {path: '/bestSellingTop10', verb: 'get'},
      returns: [
        {arg: 'products', type: 'object'}
      ]
    }
  );



  };
