//import mongoose so this model can use the mongoose CRUD function
const mongoose = require('mongoose')

// define Priority schema with the properties & data types we want
var prioritySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
})

// make this public as 'Priority'
module.exports = mongoose.model('Priority', prioritySchema)