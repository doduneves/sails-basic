/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
    
  login: function(req, res) {
    res.view();
  },
  process: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if( (err) || (!user) || !user.active ) {
        req.flash("message","Fail to Login");
        res.redirect('/login');
        return false;
      }
      req.logIn(user, function(err) {
        if(err) res.send(err);
        
        req.flash("message","Logged In");
        res.redirect('/user');
      });
    }) (req, res);
  },

  logout: function(req, res) {
    req.logOut();

    req.flash("message","User Logged Out");
    res.redirect('/login');
  }
};

module.exports.blueprints = {
  actions: true,
  rest: true,
  shortcuts: true
};
