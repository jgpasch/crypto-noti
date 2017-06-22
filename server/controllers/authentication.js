import User from '../../models/user';
import jwt from 'jwt-simple';

function tokenForUser(user) {
  const ts = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: ts }, 'qwerty623451');
}

function login(req, res, next) {
  // auth middleware complete, send user a token
  res.send({ token: tokenForUser(req.user) });
}

function signUp(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send( {error: 'Please provide email and password'} );
  }

  User.findOne({email}, function(err, existingUser) {
    if (err) {
      res.status(500).send({ error: 'server error'});
    }

    // if there an existing user,
    if (existingUser) {
      res.status(422).send({ error: 'this email is already in use' });
    }

    // otherwise create a new user.
    const newUser = new User({
      email,
      password
    });

    newUser.save(function(err) {
      if (err) {
        return next(err);
      }
      res.send({ token: tokenForUser(newUser)});
    });
  });
}

export default {
  login,
  signUp
}