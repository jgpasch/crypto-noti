import passport from 'passport';
import passportJWT from 'passport-jwt';
import LocalStrategy from 'passport-local';
import User from '../../models/user';
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;


const localOptions = {
  usernameField: 'email'
};

// local strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({email}, function(err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'qwerty623451'
};

const JwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // check if user ID exists in database
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(localLogin);
passport.use(JwtLogin);