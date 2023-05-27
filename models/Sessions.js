// Stocke les informations sur les sessions de connexion des utilisateurs

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  id_user: { type: Schema.Types.ObjectId, ref: "User", required: true},
  login_time: { type: Date, default: Date.now},
  logout_time : { type: Date, default: Date.now},
});

sessionSchema.virtual('url').get(function () {
  return "/Session/" + this._id;
});

module.exports = mongoose.model('Session', sessionSchema);