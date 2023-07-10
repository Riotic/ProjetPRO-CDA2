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
        mongoUrl:'mongodb://softia:softia@192.168.10.133:27017/ezAdmin',
        ttl: 60*60*24*14,
      }),
  
    }
  ));