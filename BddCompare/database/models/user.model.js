// librairie javascript pour l'utilisation de mongoDB
const mongoose = require('mongoose');
// librairie pour le cryptage en Bcrypt
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

const userSchema = schema({
    // Stockage local pour la création d'un cookie de session 
    local: {
        email: {type : String, unique: true, required:true } ,
        password: { type: String, required: true },
    },
    username: String
});

// cryptage du mot de passe
userSchema.statics.hashPassword = async function(password)  {
    try{
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }catch(e){
        throw e
    }
};

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.local.password);
};

// Initialisation du model pour réutilisation du code 
const User = mongoose.model('user', userSchema);

module.exports = User;