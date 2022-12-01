const express = require('express')
const Priority = require('../models/priority')
const router = express.Router()


// GET: /categories => list all categories in db
router.get('/', (req, res) => {
    // use Mongoose model to query all documents in categories collection
    Priority.find((err, priorities) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('priorities/index', {
                priorities: priorities,
                user: req.user
            })
        }
    })
})

// GET: /categories/create => display empty form to enter a new place
router.get('/create', (req, res) => {
    res.render('priorities/create')
})

// POST: /categories/create => process form submission to add new place
router.post('/create', (req, res) => {
    // use Mongoose model to create new document from form values
    Priority.create(req.body, (err, priority) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/priorities')
        }
    })
})


//GET: /status/delete/abc123 => delete selected place document : in url indicates a parameter value
router.get('/delete/:_id', (req, res) => {
    // use Mongoose to delete selected doc & redirect
    Priority.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/priorities')
        }
    })
})


// make public
module.exports = router