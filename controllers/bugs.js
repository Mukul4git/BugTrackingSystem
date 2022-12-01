const express = require('express')
const router = express.Router()

// import bug model for CRUD
const Bug = require('../models/bug')
const priority = require('../models/priority')

// import priority & status model for form dropdowns
const Priority = require('../models/priority')
const Status = require('../models/status')


// GET: /bugs => list all bugs in db
router.get('/', (req, res) => {
    // use Mongoose model to query all documents in bugs collection
    Bug.find((err, bugs) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('bugs/index', {
                bugs: bugs,
                title: 'List of our Bugs'
            })
        }
    })
})

// GET: /bugs/create => display empty form to enter a new bug
router.get('/create', (req, res) => {

        Status.find((err,statuses)=>{
            if(err){
                console.log(err)
            }
            else{
                Priority.find((err, priorities)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.render('bugs/create', {
                            title: 'Add a Bug',
                            priorities: priorities,
                            statuses: statuses
                        })
                    }
                })
            }
        })
        
    })


 
// POST: /places/create => process form submission to add new bug
router.post('/create', (req, res) => {
    // use Mongoose model to create new document from form values
    Bug.create(req.body, (err, bug) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/bugs')
        }
    })
})

//GET: /places/delete/abc123 => delete selected place document : in url indicates a parameter value
router.get('/delete/:_id', (req, res) => {
    // use Mongoose to delete selected doc & redirect
    Bug.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/bugs')
        }
    })
})

// GET: /places/edit/abc123 => display populated form to edit a place
router.get('/edit/:_id', (req, res) => {
    Bug.findById(req.params._id, (err, bug) => {
        if (err) {
            console.log(err)
        }
        else {
            Status.find((err,statuses)=>{
                if(err){
                    console.log(err)
                }
                else{
                    Priority.find((err, priorities)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            res.render('bugs/edit', {
                                title: 'Add a Bug',
                                bug: bug,
                                priorities: priorities,
                                statuses: statuses
                            })
                        }
                    })
                }
            })
                }
            })   
        })

// POST: /places/edit/abc123 => save updated doc to db
router.post('/edit/:_id', (req, res) => {
    Bug.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err, bug) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/bugs')
        }
    })
})

// make public
module.exports = router;