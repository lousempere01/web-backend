const Categories = require('../models/Categories');

// C - Crée une nouvelle catégorie

exports.createCategory = (req, res, next) => {
    const category = new Categories({
        ...req.body.category,
        "_id": undefined,
    });
    category.save()
        .then(() => {res.status(201).json({ message: 'Catégorie enregistrée !'})})
        .catch(error => {res.status(400).json({ error })});
};

// R - Voir les catégories

exports.getAllCategories = (req, res, next) => {
    Categories.find()
        .then(categories => res.status(200).json(categories))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneCategory = (req, res, next) => {
    Categories.findOne({ _id: req.params.id })
        .then(category => res.status(200).json(category))
        .catch(error => res.status(404).json({ error }));
};

// U - Modifier une catégorie

exports.modifyCategory = (req, res, next) => {
    Categories.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Catégorie modifiée !'}))
        .catch(error => res.status(400).json({ error }));
};

// D - Supprimer une catégorie

exports.deleteCategory = (req, res, next) => {
    Categories.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Catégorie supprimée !'}))
        .catch(error => res.status(400).json({ error }));
};

