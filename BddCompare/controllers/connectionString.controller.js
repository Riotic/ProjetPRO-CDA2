const Data = require('../database/models/connectionString.models');

// CREATE DATA - VISUAL
exports.renderCreateForm = (req, res) => {
  res.render('layouts/connectionStrings/create-form', { data: {} });
};

// CREATE DATA - FUNCTION
exports.createData = (req, res) => {
  const { name, user, host, database, password, port } = req.body;
  const newData = new Data({ name, user, host, database, password, port });

  newData.save()
    .then(() => {
      res.redirect('/data');
    })
    .catch((error) => {
      res.render('create-form', { data: newData, error: 'Une erreur s\'est produite lors de la création de l\'objet de données.' + error });
    });
};

// READ DATA
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
  
// UPDATE DATA - VISUAL
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
  
// UPDATE DATA - FUNCTION
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
  
// DELETE DATA
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