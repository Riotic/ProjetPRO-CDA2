const { sessionCreate, sessionDelete } = require('../../controllers/auth.controller');
const router = require('express').Router();




router.post('/signin', sessionCreate);

router.get('/signout',  sessionDelete);

module.exports = router;