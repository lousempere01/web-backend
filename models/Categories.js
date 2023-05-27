// organiser les pages en catégories
//stocke les différentes catégories disponibles

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catSchema = new Schema({
  categories_name: { type: String, required: true }
});

catSchema.virtual('url').get(function () {
  return "/Categories/" + this._id;
});

module.exports = mongoose.model('Categories', catSchema);