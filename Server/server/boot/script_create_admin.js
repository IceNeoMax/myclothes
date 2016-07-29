/**
 * Created by vjtc0n on 7/29/16.
 */
module.exports = function(app) {
  var Member = app.models.Member;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  Member.create([
    {user_name: 'Khanh', email: 'abc@gmail.com', password: '12345'},
    {user_name: 'Nhuan', email: 'abc@gmail.com', password: '12345'}
  ], function (err, users) {
    if (err) throw err;

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
