const express = require('express')
const router = express.Router()
const User = require('../models/user')

const passport = require('passport')

// GET: /auth/register => show register form
router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'User Registration'})
})


// POST: /auth/register => use passport to create new User 
router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            return res.render('auth/register')
        }
        else {
            req.login(user, (err) => {
                res.redirect('/bugs')
            })
        }
    })
})


// GET: /auth/login => show register form
router.get('/login', (req, res) => {

    //Check Session for error messages
    let messages = req.session.messages || []

    //Clear session message
    req.session.messages=[]

    res.render('auth/login', { title: 'User Login', messages:messages})
})


// POST: /auth/login => try to log the user in. any failureMessages are stored in session var
router.post('/login', passport.authenticate('local', {
    successRedirect: '/bugs',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Login'
}))

//GET: /auth/logout => end user session and redirect to webpage
router.get('/logout', (req,res,next)=>{
    req.session.messages = []
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        res.redirect('/auth/login')
    })
})

// GET: /auth/google => invoke Google signin attempt
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}), (req, res) => {}
)


// GET: /auth/google/callback => call Google strategy to register/login user
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/login'
}), (req, res) => {
    res.redirect('/bugs')
})


module.exports = router