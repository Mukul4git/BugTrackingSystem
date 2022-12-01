const express = require('express')
const Status = require('../models/status')
const router = express.Router()


// GET: /categories => list all categories in db
router.get('/', (req, res) => {
    // use Mongoose model to query all documents in categories collection
    Status.find((err, statuses) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('statuses/index', {
                statuses: statuses
            })
        }
    })
})

// GET: /categories/create => display empty form to enter a new place
router.get('/create', (req, res) => {
    res.render('statuses/create')
})

// POST: /statuses/create => process form submission to add new place
router.post('/create', (req, res) => {
    // use Mongoose model to create new document from form values
    Status.create(req.body, (err, status) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/statuses')
        }
    })
})

//GET: /status/delete/abc123 => delete selected place document : in url indicates a parameter value
router.get('/delete/:_id', (req, res) => {
    // use Mongoose to delete selected doc & redirect
    Status.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/statuses')
        }
    })
})


// make public
module.exports = router