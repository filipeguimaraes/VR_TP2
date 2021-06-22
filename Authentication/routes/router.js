var express = require('express');
var router = express.Router();
var createJWT = require('../jwt/createJWT');

//rota inicial
router.get('/', (req, res) => {
    res.redirect('/login');
})
//rota de login
router.get('/login', (req, res) => {
    res.render('login');
})
//rota de login
router.get('/signup', (req, res) => {
    res.render('login');
})
//rota de login
router.get('/login_', (req, res) => {
    res.render('loginFail');
})
//rota de login
router.get('/error', (req, res) => {
    res.render('error');
})

//dados de login
router.post('/login', (req, res) => {
    console.log(req.body);
    createJWT(req.body.username,req.body.password).then((jwt) => {
        if(jwt.auth === true){
            res.cookie('token',jwt.token);
            if(jwt.role === 'user'){
                res.redirect('http://0.0.0.0:4000/user');
            } else if(jwt.role === 'moderator'){
                res.redirect('http://0.0.0.0:4000/moderator');
            } else if(jwt.role === 'admin'){
                res.redirect('http://0.0.0.0:4000/admin');
            }
            //res.redirect('/');
        } else res.redirect('/login_');
    });
})


module.exports = router;