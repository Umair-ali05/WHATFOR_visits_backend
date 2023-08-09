var jwtStrategy = require('passport-jwt').Strategy;
var extractJwt = require('passport-jwt').ExtractJwt;
var passport = require('passport');
var User = require('../db/models/user.js');

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(
    new jwtStrategy(opts, function (_payload, done) {
      if (_payload.user) {
        var uid = _payload.user._id;
      } else {
        if (_payload._doc._id) {
          var uid = _payload._doc._id;
        }
      }
      User.findOne({ _id: uid }, function (err, user) {
        if (err) {
          return done(err, false);
        } else {
          if (!user) {
            done(null, false);
          } else {
            done(null, user);
          }
        }
      });
    })
  );
};
