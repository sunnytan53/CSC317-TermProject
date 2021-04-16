var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home',
        { title: "Home"});
});

router.get('/login', (req, res, next) => {
    res.render('login',
        { title: "Login" });
});

router.get('/registration', (req, res, next) => {
    res.render('registration',
        { title: "Registration", script: "registration.js" });
});

router.get('/postimage', (req, res, next) => {
    res.render('postimage',
        { title: "Post image" });
});

router.get('/Imagepost', (req, res, next) => {
    res.render('Imagepost');
});

module.exports = router;
