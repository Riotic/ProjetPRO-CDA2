const assert = require('assert');
const mongoose = require('mongoose');

const User = require('../database/models/user.model.js');
const { exit } = require('process');

async function createUser(email, password, username) {
    try {
        // Vérifiez si l'utilisateur existe déjà
        // await bddConect();
        const existingUser = await User.findOne({ 'local.email': email });
        if (existingUser) {
        console.log('Cet utilisateur existe déjà.');
        return;
        }

        // Créez un nouvel utilisateur
        const hashedPassword = await User.hashPassword(password);
        const newUser = new User({
        local: {
            email,
            password: hashedPassword,
        },
        username,
        });

        await newUser.save();
        console.log('Utilisateur créé avec succès.');
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error.message);
    } finally {
        // mongoose.disconnect();
        return // Fermez la connexion à la base de données
    }
}

async function verifyPassword(email, password) {
    
    try {
        // await bddConect();
        // Récupérez l'utilisateur à partir de la base de données
        const user = await User.findOne({ 'local.email': email });
        if (!user) {
        console.log('Utilisateur non trouvé.');
        return;
        }

        // Vérifiez le mot de passe
        const isPasswordValid = await user.comparePassword(password);
        if (isPasswordValid) {
        console.log('Mot de passe valide.');
        } else {
        console.log('Mot de passe invalide.');
        }
    } catch (error) {
        console.error('Erreur lors de la vérification du mot de passe :', error.message);
    } finally {
        // mongoose.disconnect();
        return // Fermez la connexion à la base de données
    }
}
  
async function deleteUser(email) {
    
    try {
        // await bddConect();
        // Recherchez l'utilisateur dans la base de données
        const user = await User.findOne({ 'local.email': email }).then(doc => {
            doc.deleteOne();
            console.log('Utilisateur supprimé avec succès.');
        });

    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error.message);
    } finally {
        // mongoose.disconnect();
        return // Fermez la connexion à la base de données
    }
}

async function createVerifyDeleteUser(email, password, username) {
    mongoose.connect('mongodb://rio:dossierPro@127.0.0.1:27017/renduPro', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then( async function() {
        try {
            await deleteUser(email);
            // Créez un utilisateur
            await createUser(email, password, username);
        
            // Vérifiez le mot de passe
            await verifyPassword(email, password);
        
            // Supprimez l'utilisateur
            await deleteUser(email);
          } catch (error) {
            console.error('Erreur lors de l\'exécution des fonctions :', error.message);
          } finally {
            exit();
          }
        }).catch( err => {
            console.log("fail");
            console.log(err);
    });

    // await mongoose.disconnect();
}



createVerifyDeleteUser('nouvelUtilisateur@example.com', 'motDePasse123', 'MonNouvelUtilisateur');

// mongoose.disconnect();
