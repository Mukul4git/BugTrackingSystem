// import mongoose so this model can use the mongoose CRUD functions
const mongoose = require('mongoose')

//Creating Bug Schema 
var bugSchema = new mongoose.Schema({
    
    title:{
        type: String,
        required: 'Name is required'
    },

    status:{
        type: String,
        required: 'Status is required'
    },

    type: {
        type: String,
        required: 'Type of Bug is required.'
    },
    
    description: {
        type: String,
        required: 'Description is required.'
    },

    priority: {
        type: String,
        required: 'Priority is required.'
    },

    solution: {
        type: String
    },

    creator: {
        type: String
    }

})

// make this public as 'Bug'
module.exports = mongoose.model('Bug', bugSchema)