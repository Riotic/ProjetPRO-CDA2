const {sessionNew, sessionCreate, sessionDelete } = require('../controllers/auth.controller');
const router = require('express').Router();


router.get('/signin/form', sessionNew);

router.post('/signin', sessionCreate);
router.get('/signout',  sessionDelete);

module.exports = router;