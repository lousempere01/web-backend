const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const stuffRoutes = require("./routes/stuff");
const catRoutes = require("./routes/categories");
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");
const pagesRoutes = require("./routes/pages");
const sessionsRoutes = require("./routes/session");

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/categories", catRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/pages", pagesRoutes);
app.use("/api/session", sessionsRoutes);

module.exports = app;
