// Stocke les informations sur les utilisateurs
// Créer de nouveaux utilisateurs
// Lire les informations
// Mettre à jour leurs données
// Supprimer des utilisateurs

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.virtual("url").get(function () {
  return "/User/" + this._id;
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
