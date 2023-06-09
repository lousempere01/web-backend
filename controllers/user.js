const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = (req, res, next) => {
  bcrypt
    .genSalt(parseInt(process.env.HASH_SALT))
    .then((salt) => {
      return bcrypt.hash(req.body.password, salt);
    })
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      console.log(user);
      return user.save();
    })
    .then(() => {
      res.status(201).json({ message: "Utilisateur créé avec succès !" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// user
// .save()
// .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
// .catch((error) => {
//   console.log(error);
//   res.status(400).json({ error: error.message });
// });

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte !" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({
                message: "Paire identifiant/mot de passe incorrecte !",
              });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                  expiresIn: "1000h",
                }),
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// exports.logout = (req, res, next) => {
//   req.session.destroy((err) => {
//     if (err) {
//       res.status(500).json({ error: "Erreur lors de la déconnexion" });
//     } else {
//       req.logout(); // Déconnexion de l'utilisateur (fonction fournie par Passport.js)
//       res.status(200).json({ message: "Déconnexion réussie !" });
//     }
//   });
// };
