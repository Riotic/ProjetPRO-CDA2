const router = require('express').Router();
const userRoutes = require('./users/user.routes');
const authRoutes = require('./users/auth.routes');
const apiRoutes = require('./router');
const connectionString = require('./connectionStrings/connect.routes');
const Data = require('../database/models/connectionString.models');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/security.config');

router.use('/users', userRoutes);
router.use('/', connectionString);
router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

router.get('/',  (req, res) => {
    res.render('layouts/index', {user: req.user, cssPath: 'NiceAdmin/NiceAdmin/assets/vendor/bootstrap/css/bootstrap.min.css'});
});

router.get('/auth/signin', (req, res)  => {
    res.render('layouts/index', {user: req.user, cssPath: 'NiceAdmin/NiceAdmin/assets/vendor/bootstrap/css/bootstrap.min.css'});
});

router.get('/auth/signin/form', (req, res) => {
    res.redirect('/');
});


// Route pour la page bddCompare protégé par ensureAuthenticated
router.get('/bddCompare', ensureAuthenticated, async (req, res) => {
    const dataString = await Data.find();
    res.render('layouts/default', { dataString: dataString, user: "so" });
  
});

router.get('/api/datas', (req, res) => {
    Data.find()
      .then((dataString) => {
        res.json(dataString);
      })
      .catch((error) => {
        console.error('Une erreur s\'est produite lors de la récupération des datas :', error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des datas' });
      });
});

module.exports = router;