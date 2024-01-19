const assert = require('assert');
const mongoose = require('mongoose');
const Data = require('../database/models/connectionString.models');

before((done) => {
    mongoose.connect('mongodb://rio:dossierPro@127.0.0.1:27017/renduPro', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connexion à la base de données réussie");
        done();
    })
    .catch((error) => {
        console.error("Erreur pendant la connexion à la base de données :", error);
        done(error);
    });
});

// Définit les tests pour le modèle Data
describe('Data Model', function(){

  // Avant chaque test, supprime tous les documents de la collection 'datas'
  beforeEach(async function(){
    await Data.deleteMany({});
  });

  // Teste la création de données
  it('should create a new data', async function(){
    const newData = new Data({
      name: 'TestData',
      user: 'testUser',
      host: 'localhost',
      database: 'testDB',
      password: 'testPassword',
      port: 1234,
    });
    await newData.save();

    const savedData = await Data.findOne({ name: 'TestData' });
    assert.strictEqual(savedData.name, 'TestData');
    
  });

  // Teste la recherche par nom
  it('should find data by name', async function(){
    const newData = new Data({
      name: 'TestData',
      user: 'testUser',
      host: 'localhost',
      database: 'testDB',
      password: 'testPassword',
      port: 1234,
    });
    await newData.save();

    const foundData = await Data.findByDataName('TestData');
    assert.strictEqual(foundData.name, 'TestData');
  });

  // Teste l'unicité des index
//   it('should enforce uniqueness of index', async function(){
//     const data1 = new Data({
//       name: 'TestData',
//       user: 'testUser',
//       host: 'localhost',
//       database: 'testDB',
//       password: 'testPassword',
//       port: 1234,
//     });
//     const data2 = new Data({
//       name: 'TestData',
//       user: 'testUser2',
//       host: 'localhost',
//       database: 'testDB2',
//       password: 'testPassword2',
//       port: 5678,
//     });

//     await data1.save();

//     // Tentative d'enregistrement d'une deuxième entrée avec les mêmes valeurs d'index
//     try {
//       await data2.save();
//       throw new Error('Expected unique index violation but got none');
//     } catch (error) {
//       assert.strictEqual(error.name, 'MongoError');
//       assert.strictEqual(error.code, 11000); // Code d'erreur pour violation d'index unique
//     }
//   });
});
// Déconnection de la base de données après avoir exécuté les tests
after((done) => {
    mongoose.disconnect(() => {
        console.log("Déconnexion de la base de données");
        done();
    });
});