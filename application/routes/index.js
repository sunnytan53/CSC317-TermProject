var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotector').userIsLoggedIn;
const { getRecentPosts, getPostById, getCommentsByPostId } = require('../middleware/postsmiddleware');

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

router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req, res, next) => {
    res.render('imagepost',
        {
            title: `${res.locals.currentPost.title}`,
            description: `${res.locals.currentPost.description}`
        });

});

module.exports = router;
