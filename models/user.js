const mongoose = require('mongoose')

// add package to extend functionality of this model for authentication
const passportLocalMongoose = require('passport-local-mongoose')

//add plugin for findorcreate method to use with Oauth logins 
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new mongoose.Schema({

    username: String,
    password: String,
    oauthId: String,
    oauthProvider: String,
    created: Date

})

//use plm to extend this model so passport knows to use this for all User Management 
// use plm to extend this model so passport knows to use this for all User Management
// similar to Java inheritance - our model now inherits from PLM so it has all its methods/properties
userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)


module.exports = mongoose.model('User', userSchema)