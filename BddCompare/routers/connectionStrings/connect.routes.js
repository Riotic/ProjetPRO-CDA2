const express = require('express');
const router = express.Router();
// const dataController = require('./controllers/connectionString.controller');
const dataController = require('../../controllers/connectionString.controller');
// const { ensureAuthenticated } = require('./middlewares/auth');
const { ensureAuthenticated } = require('../../config/security.config');

// Route pour afficher toutes les données
router.get('/data', ensureAuthenticated, dataController.showAllData);

// Route pour afficher le formulaire de création
router.get('/data/create', ensureAuthenticated, dataController.renderCreateForm);

// Route pour traiter la soumission du formulaire de création
router.post('/data/create', ensureAuthenticated, dataController.createData);

// Route pour afficher le formulaire de modification d'une donnée
router.get('/data/edit/:id', ensureAuthenticated, dataController.renderEditForm);

// Route pour mettre à jour une donnée
router.post('/data/edit/:id', ensureAuthenticated, dataController.updateData);

// Route pour supprimer une donnée
router.post('/data/delete/:id', ensureAuthenticated, dataController.deleteData);

module.exports = router;