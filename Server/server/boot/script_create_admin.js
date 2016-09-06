/**
 * Created by vjtc0n on 7/29/16.
 */
var faker = require('faker');

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

  Member.create([
    {user_name: 'Khanh', email: faker.internet.email(), password: '12345'},
    {user_name: 'Nhuan', email: faker.internet.email(), password: '12345'}
  ], function (err, users) {
    if (err) throw err;

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
