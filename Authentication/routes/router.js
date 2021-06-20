var express = require('express');
var router = express.Router();
var createJWT = require('../jwt/createJWT');
var verifyJWT = require('../jwt/verifyJWT');


//rota inicial
router.get('/', (req, res, next) => {
    res.redirect('/login');
})
//rota de login
router.get('/login', (req, res, next) => {
    res.render('login');
})
//rota de login
router.get('/signout', (req, res, next) => {
    //TODO
    res.render('login');
})
//rota de login
router.get('/error', (req, res, next) => {
    res.render('error');
})

//dados de login
router.post('/login', (req, res, next) => {
    console.log(req.body);
    createJWT(req.body.username).then((jwt) => {
        console.log(jwt);
    }).catch(res.render('error'));

    
})

module.exports = router;