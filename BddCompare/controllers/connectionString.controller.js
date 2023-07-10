// Importation des dépendances
// const Data = require('../models/connectionString.models');
const Data = require('../database/models/connectionString.models');

// Méthode de rendu de la vue du formulaire de création
exports.renderCreateForm = (req, res) => {
  res.render('layouts/connectionStrings/create-form', { data: {} });
};

// Méthode de gestion de la soumission du formulaire de création
exports.createData = (req, res) => {
  const { name, user, host, database, password, port } = req.body;
  const newData = new Data({ name, user, host, database, password, port });

  newData.save()
    .then(() => {
        res.redirect('/data'); // Redirection vers une page de succès si nécessaire
    })
    .catch((error) => {
      res.render('create-form', { data: newData, error: 'Une erreur s\'est produite lors de la création de l\'objet de données.' + error });
    });
};




// Méthode pour afficher toutes les données
exports.showAllData = (req, res) => {
    Data.find()
      .then((data) => {
        res.render('layouts/connectionStrings/data-list', { data, error: null });
      })
      .catch((error) => {
        console.log('Une erreur s\'est produite lors de la récupération des données :', error);
        res.render('data-list', { data: [], error: 'Une erreur s\'est produite lors de la récupération des données.' });
      });
  };
  
  // Méthode pour afficher le formulaire de modification d'une donnée spécifique
  exports.renderEditForm = (req, res) => {
    const { id } = req.params;
  
    Data.findById(id)
      .then((data) => {
        if (!data) {
          res.redirect('/data');
          return;
        }
  
        res.render('layouts/connectionStrings/edit-form', { data, error: null });
      })
      .catch((error) => {
        console.log('Une erreur s\'est produite lors de la récupération des données :', error);
        res.redirect('/data');
      });
  };
  
  // Méthode pour mettre à jour une donnée spécifique
  exports.updateData = (req, res) => {
    const { id } = req.params;
    const { name, user, host, database, password, port } = req.body;
  
    Data.findByIdAndUpdate(id, { name, user, host, database, password, port }, { new: true })
      .then((updatedData) => {
        if (!updatedData) {
          res.redirect('/data');
          return;
        }
  
        res.redirect('/data');
      })
      .catch((error) => {
        console.log('Une erreur s\'est produite lors de la mise à jour de la donnée :', error);
        res.redirect('/data');
      });
  };
  
  // Méthode pour supprimer une donnée spécifique
  exports.deleteData = (req, res) => {
    const { id } = req.params;
  
    Data.findByIdAndRemove(id)
      .then(() => {
        res.redirect('/data');
      })
      .catch((error) => {
        console.log('Une erreur s\'est produite lors de la suppression de la donnée :', error);
        res.redirect('/data');
      });
  };