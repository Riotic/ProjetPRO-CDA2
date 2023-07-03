const router = require('express').Router();
const userRoutes = require('./users/user.routes');
const authRoutes = require('./users/auth.routes');
const apiRoutes = require('./router');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/security.config');

router.use('/users', userRoutes);
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
    // console.log(rows);
    const data = {
        title: "bddCompare",
        h1: "Bonjour",
    };
    res.render('layouts/default', {data: data, user: "softia"});
});

module.exports = router;