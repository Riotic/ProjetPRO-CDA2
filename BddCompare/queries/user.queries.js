const User = require('../database/models/user.model');

exports.createUser = async (body) => {
    try{
        const hashPassword = await User.hashPassword(body.password);
        const user = new User({ 
            username: body.username,
            local: {
                email: body.email,
                password: hashPassword
            }
        })
        return user.save() && console.log("reussi");
    }catch(e) {
        console.log("fail");
        throw e;
    }

}

exports.findUserPerEmail = async (email) => {
    return User.findOne({ 'local.email': email }).exec();
  }