const mongoose = require('mongoose');

// Définition du schéma
const Schema = mongoose.Schema;
const dataSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  database: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  port: {
    type: Number,
    required: true
  }
});

// Définition de l'index composé sur host, database, password et port (uniqueness)
dataSchema.index({ name: 1, host: 1, database: 1, password: 1, port: 1 }, { unique: true });

// Méthode statique pour trouver une donnée par son nom
dataSchema.statics.findByDataName = function (dataName) {
  return this.findOne({ name: dataName }).exec();
};

// Création du modèle
const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
