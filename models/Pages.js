// Stocke les informations des pages du journal intime
// Stocker les pages du journal intime
// Créer de nouvelles pages
// Lire le contenu des pages
// Mettre à jour les pages existantes
// Supprimer des pages

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pagesSchema = new Schema({
  // id_user: { type: Schema.Types.ObjectId, ref: "User", required: true},
  title: { type: String, required: true },
  contenu: { type: String, required: true },
  imageUrl: { type: String, required: false },
  date_creation: { type: Date, required: true },
  date_modification: { type: Date, Default: Date.now },
  id_categories: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
    required: false,
  },
});

pagesSchema.virtual("url").get(function () {
  return "/Pages/" + this._id;
});

module.exports = mongoose.model("Pages", pagesSchema);
