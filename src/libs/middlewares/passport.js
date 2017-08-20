const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const libs = `${process.cwd()}/libs`;
const config = require(`${libs}/config`);
const User = require(`${libs}/models/user`)

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.get('mongodb:secret');
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.find({email: jwt_payload.email}, function(err, user){
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {message: 'Unknown user'});
            }

            return done(null, user);
        });
    }));
};

/* To check if a user has access to a route, one must use passport.authenticate() specifying 'JWT' as the strategy in the route declaration, like so:
//pass passportfor configuration
require('./config/passport')(passport);

app.post('/route', passport.authenticate('jwt', { session: false}), function(req, res) { });

the user object is then accessible via req.user
----

Another way to check if a user is authenticated, is to check the request header for the json web token, like so:

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.get(mongodb.secret));
  }
 */
