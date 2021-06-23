var express = require('express');
var router = express.Router();
var createJWT = require('../jwt/createJWT');
const {selectUser, insertUser} = require('../database/index');

//rota inicial
router.get('/', (req, res) => {
    res.redirect('/login');
})
//rota de login
router.get('/login', (req, res) => {
    res.render('login');
})
//rota de login
router.get('/login_', (req, res) => {
    res.render('loginFail');
})
//rota de login
router.get('/signup', (req, res) => {
    res.render('signup');
})
//rota de login
router.get('/signup_', (req, res) => {
    res.render('signupFail');
})
//rota de login
router.get('/error', (req, res) => {
    res.render('error');
})

//dados de login
router.post('/login', (req, res) => {
    createJWT(req.body.username, req.body.password).then((jwt) => {
        if (jwt.auth === true) {
            res.cookie('token', jwt.token);
            res.redirect('http://0.0.0.0:4000/');
            
        } else res.redirect('/login_');
    });
})

//dados de signup
router.post('/signup', (req, res) => {
    console.log(req.body);
    selectUser(req.body.username).then((dbuser) => {
        if (dbuser.id === '-1') {
            insertUser(req.body.username, req.body.password).then((result) => {
                if (result === true) {
                    res.redirect('/login');
                } else res.render('signupFail', {message: "Error creating user!"});
            });
        } else res.render('signupFail', {message: "Username already exists!"});
    });
})

module.exports = router;