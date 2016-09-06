/**
 * Created by vjtc0n on 7/20/16.
 */
module.exports = function (app) {
  //Node Express here
  var router = app.loopback.Router();
  /*router.get('/ping', function(req, res) {
    res.send('pongaroo');
  });*/

  /*app.post('/login', function(req, res) {
    User.login({
      email: req.body.email,
      password: req.body.password
    }, 'user', function(err, token) {
      if (err) {
        res.render('response', { //render view named 'response.ejs'
          title: 'Login failed',
          content: err,
          redirectTo: '/',
          redirectToLinkText: 'Try again'
        });
        return;
      }

      res.render('home', { //login user and render 'home' view
        email: req.body.email,
        accessToken: token.id
      });
    });
  });*/

  app.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    app.models.Member.login({
      email: email,
      password: password
    }, 'member', function (err, token) {
      if (err) throw err;
      token = token.JSON();
      var user = {
        user_name: token.member.user_name,
        accessToken: token.id
      };
      res.json(user);
    });
  });

  app.get('/logout', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401); //return 401:unauthorized if accessToken is not present
    User.logout(req.accessToken.id, function(err) {
      if (err) return next(err);
      res.redirect('/'); //on successful logout, redirect
    });
  });

  /*app.post('/request-password-reset', function(req, res, next) {
    User.resetPassword({
      email: req.body.email
    }, function(err) {
      if (err) return res.status(401).send(err);
      res.render('response', {
        title: 'Password reset requested',
        content: 'Check your email for further instructions',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });
*/
  app.use(router);
};
