const express = require('express');
const bodyParser = require("body-parser");
const User = require('./database/models/user.model');

const router = require('./routers');
const app = express();
exports.app = app;
require("./database");

require('./config/session.config');
require('./config/passport.config');



app.set('view engine', 'ejs'); // Utilise EJS comme moteur de template
app.set('views', __dirname + '/views');


app.use(express.static('public')); // Spécifie le dossier de fichiers statiques
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());






// Route pour la page de connection
app.get('/login', async (req, res) => {
  User.findOne({}).exec().then( doc => {
    res.json(doc);
  });

  // console.log(rows); 
  // const data = {
  //     title: "auth",
  //     h1: "Bonjour",
  // };

  // res.render('layouts/auth', {data: data});
});

// Route pour la page bddCompare

app.use(router);

// Lancement du serveur sur le port 3000
app.listen(3000, () => {
  console.log('Serveur lancé sur le port 3000, http://localhost:3000/');
});

