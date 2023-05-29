const Pages = require("../models/Pages");
const moment = require("moment");

// C - Créer une nouvelle page

exports.createPage = (req, res, next) => {
  delete req.body._id;
  const page = new Pages({
    ...req.body,
    date_creation: moment().toISOString(),
    date_modification: moment().toISOString(),
  });
  page
    .save()
    .then(() => res.status(201).json({ message: "Created page !" }))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// R - Récupérer toutes les pages d'un utilisateur

exports.getAllPages = (req, res, next) => {
  Pages.find({ id_user: req.auth.userId })
    .then((page) => res.status(200).json(page))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// R - Récupérer une page

exports.getOnePage = (req, res, next) => {
  Pages.findOne({ _id: req.params.id, id_user: req.auth.userId })
    .then((page) => {
      if (!page) {
        res.status(404).json({ error: "Page not found !" });
      } else {
        res.status(200).json(page);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// U - Mettre à jour une page

exports.modifyPage = (req, res, next) => {
  Pages.updateOne(
    { _id: req.params.id },
    {
      title: req.body.title,
      contenu: req.body.contenu,
      imageUrl: req.body.imageUrl,
      date_modification: moment().toISOString(),
    }
  )
    .then(() => res.status(200).json({ message: "Updated page !" }))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// D - SUPPRIMER une page

exports.deletePage = (req, res, next) => {
  Pages.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Deleted page !" }))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
