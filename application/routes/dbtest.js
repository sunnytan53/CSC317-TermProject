const express = require('express');
const router = express.Router();
const db = require('../config/database.js')

router.get('/getAllUsers', (req, res, next) => {
    db.query('select * from users;'), (req, res, next) => {
        if (err) {
            next(err);
        }
        console.log(results);
        res.send(results);
    }
});

router.get('/getAllPosts', (req, res, next) => {
    db.query('select * from posts;', (req, res, next) => {
        if (err) {
            next(err);
        }
        console.log(results);
        res.send(results);
    })
})

router.post('/createUser', (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let baseSQL = 'insert into users (username, email, password, created) values (?, ?, ?, now())';
    db.query(baseSQL, [username, email, password])
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                res.send('user was made');
            } else {
                res.send('user was not made for some reason');
            }
        })
        .catch((err) => next(err));
})

module.exports = router;