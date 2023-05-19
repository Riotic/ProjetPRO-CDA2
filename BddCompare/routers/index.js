const router = require('express').Router();
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const apiRoutes = require('./router');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/security.config');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

// router.get('/', async (req, res) => {
//     console.log(req.session.id);

//     if(req.session.views){
//       req.session.views += 1;
//     }else{
//       req.session.views = 1;
//     }

//     console.log(req.session);

//     const data = {
//         title: "bddCompare",
//         h1: "Bonjour",
//     };
//     res.render('layouts/default', {data: data});
// });

router.get('/',  (req, res) => {
    res.render('layouts/index', {user: req.user});
});
// Route pour la page bddCompare
router.get('/bddCompare', ensureAuthenticated, async (req, res) => {
    // console.log(rows);
    const data = {
        title: "bddCompare",
        h1: "Bonjour",
    };
    res.render('layouts/default', {data: data, user: "softia"});
});

// router.get('/protected', ensureAuthenticated, (req, res) => {
//     res.render('protected');
// });


module.exports = router;