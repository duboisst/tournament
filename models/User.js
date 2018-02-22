var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  fullname: String,
  email: String,
  gender: String,
  location: String,
  birthday: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);