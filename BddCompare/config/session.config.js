const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const { app } = require('../app');

app.use(
  // setup token de session
    session({
      secret: 'renduPro',
      resave: false,
      name: 'jesuisunid',
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 60*60*24*14*1000
      },
      store: new MongoStore({
        mongoUrl:'mongodb://rio:dossierPro@127.0.0.1:27017/renduPro',
        ttl: 60*60*24*14,
      }),
  
    }
  ));