var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index',
        {
            title: "Home",
            description: "To be added soon, please check out other pages."
        });
});

router.get('/login', (req, res, next) => {
    res.render('login',
        {
            title: "Login",
            description: "For users to log in"
        });
});

router.get('/registration', (req, res, next) => {
    res.render('registration',
        {
            title: "Registration",
            script: "registration.js",
            pageclass: "reg",
            description: "For guests to register accounts"
        });
});

router.get('/postimage', (req, res, next) => {
    res.render('postimage',
        {
            title: "Post image",
            description: "For registered users to post images"
        });
});

router.get('/Imagepost', (req, res, next) => {
    res.render('Imagepost',
        {
            title: "Image Post",
            description: "For viewing an individual image post"
        });
});

module.exports = router;
