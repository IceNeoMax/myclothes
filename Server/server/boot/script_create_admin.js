/**
 * Created by vjtc0n on 7/29/16.
 */
var faker = require('faker');
var mongoose = require('mongoose');

module.exports = function(app) {
  var Member = app.models.Member;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Post = app.models.Post;
  var Product = app.models.Product;
  var Order = app.models.Order;
  var ShoppingCart = app.models.ShoppingCart;
  var Payment = app.models.Payment;
  var Comment = app.models.Comment;

  /* Delete all things left*/

  mongoose.connect('mongodb://localhost:27017/myclothes');

  mongoose.connection.on('open', function(){
    mongoose.connection.db.dropDatabase(function(err){
      console.log(err);
    });
  });

  /* Start create Model*/

  Member.create([
    {user_name: 'Khanh', email: 'abc@g.co', password: 'luukhanhvi1@'},
    {user_name: 'Nhuan', email: faker.internet.email(), password: '12345'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'},
    {user_name: 'Kha', email: faker.internet.email(), password: 'luukhanhvi1@'}
  ], function (err, users) {
    if (err) throw err;

    // create post
    users[0].posts.create([
      {
        album_name: 'abc',
        description: 'def',
        time: new Date()
      }
    ], function (err, post) {
      if (err) throw err;

      post[0].comments.create({
        content: 'good',
        time: new Date(),
        user_id: users[0].id
      }, function (err, comment) {
        if (err) throw err;

      });
    });

    // create order

    users[0].products.create([
      {
        name: 'Ao thun ABC'
      }
    ], function (err, product) {
      if (err) throw err;
      users[0].orders.create([
        {
          order_time: new Date(),
          quantity: 10,
          product_id: product[0].id
        }
      ], function (err, order) {
        if (err) throw err;
        //console.log(product[0].id)
        // create other order with the same product

        users[2].orders.create([
          {
            order_time: new Date(),
            quantity: 10,
            product_id: product[0].id
          }
        ], function (err, otherOrder) {
          if (err) throw err;
        });


      });
    });

    users[5].products.create([
      {
        name: 'Ao thun ABCDE'
      }
    ], function (err, product) {
      if (err) throw err;
      users[0].orders.create([
        {
          order_time: new Date(),
          quantity: 15,
          product_id: product[0].id
        }
      ], function (err, order) {
        if (err) throw err;
        //console.log(product[0].id)
        // create other order with the same product

        users[4].orders.create([
          {
            order_time: new Date(),
            quantity: 15,
            product_id: product[0].id
          }
        ], function (err, otherOrder) {
          if (err) throw err;
        });


      });
    });

    // create Role
    Role.create({
      name: 'admin'
    },function (err, role) {
      if (err) throw err;
      console.log('role is ', role);

      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function (err, principal) {
        if (err) throw err;
        console.log('created principal', principal);
      });
    });
  });
};
