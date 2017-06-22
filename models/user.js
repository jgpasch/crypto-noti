import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// hash password pre save
UserSchema.pre('save', function(next) {
  const user = this;

  // gen salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });

});

// compare method
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
}

const User = mongoose.model('user', UserSchema);

export default User;