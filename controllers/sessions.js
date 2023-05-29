const Session = require("../models/Sessions");

// C - Créer une nouvelle session

// exports.createSession = (req, res, next) => {
//     delete req.body._id;
//     const session = new Session({
//         ...req.body,
//         login_time: moment().toISOString(),
//         logout_time: moment().toISOString(),
//         });
//     session
//         .save()
//         .then(() => res.status(201).json({ message: "Session créée!" }))
//         .catch((err) => {
//             res.status(500).json({ error: err.message });
//         });
// };

exports.createSession = (req, res, next) => {
  delete req.body._id;
  const session = new Session({
    id_user: req.auth.userId,
    login_time: moment().toISOString(),
    logout_time: moment().toISOString(),
  });
  session
    .save()
    .then(() => res.status(201).json({ message: "Session created!" }))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// R -  lire les détails d'une session en fonction de son ID de session.

exports.getOneSession = (req, res, next) => {
  Session.findOne({ _id: req.params.id, id_user: req.auth.userId })
    .then((session) => res.status(200).json(session))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// U - Met à jour les informations d'une session existante, telles que l'heure de déconnexion.

exports.modifySession = (req, res, next) => {
  Session.updateOne(
    { _id: req.params.id },
    {
      logout_time: moment().toISOString(),
    }
  )
    .then(() => res.status(200).json({ message: "Updated session!" }))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// D - Supprime une session de la table en fonction de son ID de session.

exports.deleteSession = (req, res, next) => {
  Session.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Session deleted !" }))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
