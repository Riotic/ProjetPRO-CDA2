const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

const userSchema = schema({
    local: {
        email: {type : String, unique: true, required:true } ,
        password: { type: String, required: true },
    },
    username: String
})

userSchema.statics.hashPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }catch(e){
        throw e
    }
}

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.local.password);
}


const User = mongoose.model('user', userSchema);

module.exports = User;