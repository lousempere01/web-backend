// Pour contacter l'admin du site

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true },
  numero: { type: String, required: false },
  message: { type: String, required: true },
});

contactSchema.virtual('url').get(function () {
    return "/Contact/" + this._id;
});

module.exports = mongoose.model('Contact', contactSchema);