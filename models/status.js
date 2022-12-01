//import mongoose so this model can use the mongoose CRUD function
const mongoose = require('mongoose')

// define Status schema with the properties & data types we want
var statusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
})

// make this public as 'Status'
module.exports = mongoose.model('Status', statusSchema)