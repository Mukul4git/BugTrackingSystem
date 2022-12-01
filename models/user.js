const mongoose = require('mongoose')

// add package to extend functionality of this model for authentication
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new mongoose.Schema({

    username: String,
    password: String

})

//use plm to extend this model so passport knows to use this for all User Management 
// use plm to extend this model so passport knows to use this for all User Management
// similar to Java inheritance - our model now inherits from PLM so it has all its methods/properties
userSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model('User', userSchema)