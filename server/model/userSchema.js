const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const env = require('../utils/env');


env.load();
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    faceimg : { 
        type: String,
        required: true
    }
 
})


userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        // console.log("hello hash");
        this.password = await bcrypt.hash(this.password,process.env.HASH_SALT);
    }
    next();
});

// generating code
userSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({},process.env.SECRET_KEY,{ expiresIn: 604800, subject: ''+this._id });
        await this.save();
        return token;
    }
    catch(err)
    {
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;

