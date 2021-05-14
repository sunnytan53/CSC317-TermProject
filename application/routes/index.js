var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotector').userIsLoggedIn;
var getRecentPosts = require('../middleware/postsmiddleware').getRecentPosts;
var db = require('../config/database');

/* GET home page. */
router.get('/', getRecentPosts, (req, res, next) => {
    res.render('index',
        {
            title: "Home",
            description: "Welcome to my web application - (Sunny)Haoyuan Tan"
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
            description: "For guests to register accounts",
            script: "registration.js",
            pageclass: "reg"
        });
});

router.get('/postImage', isLoggedIn, (req, res, next) => {
    res.render('postImage',
        {
            title: "Post image",
            description: "For registered users to post images"
        });
});

router.get('/post/:id(\\d+)', (req, res, next) => {
    db.execute("select u.username, p.title, p.description, p.photopath, p.created \
        from users u join posts p on u.id = fk_userid where p.id =? ", [req.params.id])
        .then(([results, fields]) => {
            if (results && results.length) {
                res.render('imagepost', { currentPost: results[0] });
            } else {
                req.flash('error', 'There is no such post at this URL!');
                res.redirect('/');
            }
        })
});

router.get('/post', (req, res, next) => {
    res.render('imagepost');
});

module.exports = router;
