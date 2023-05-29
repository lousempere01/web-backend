const Contact = require("../models/Contact");

// C - Crée un nouveau contact avec l'admin du site.

exports.createContact = (req, res, next) => {
  //   delete req.body._id;
  const contact = new Contact({
    ...req.body,
  });

  contact
    .save()
    .then(() => res.status(201).json({ message: "Message send!" }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};
