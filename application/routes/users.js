var express = require('express');
var router = express.Router();
var db = require('../config/database');
var { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var UserError = require('../helpers/error/UserError');
var bcrypt = require('bcrypt');

router.post('/register', (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let cPassword = req.body.cPassword;

    if (/[a-zA-Z]/.test(username.charAt(0))
        && username.replace(/[^a-zA-Z0-9]/).length >= 3
        && /\w@.+\w\.\w/.test(email)
        && password.length >= 8
        && /[A-Z]/.test(password)
        && /[0-9]/.test(password)
        && /[^\w]/.test(password)
        && password == cPassword
        && password.length != 0) {
        // It will only execute when all conditions are met, or it will also output error
        db.execute("select * from users where username=?", [username])
            .then(([results, fields]) => {
                if (results && results.length == 0) {
                    return db.execute("select * from users where email=?", [email]);
                } else {
                    throw new UserError("User Error: registration failed, username already exists", "/registration", 200);
                }
            })
            .then(([results, fields]) => {
                if (results && results.length == 0) {
                    return bcrypt.hash(password, 5);
                } else {
                    throw new UserError("User Error: registration failed, email already exists", "/registration", 200);
                }
            })
            .then((hPassword) => {
                return db.execute("insert into users (username, email, password, created) values (?,?,?,now())", [username, email, hPassword]);
            })
            .then(([results, fields]) => {
                if (results && results.affectedRows) {
                    req.flash('success', 'User Account was created!');
                    successPrint("User was created!!!")
                    res.redirect('/login');
                } else {
                    throw new UserError("Server Error: user could not be created", "/registration", 500);
                }
            })
            .catch((err) => {
                errorPrint("Registraction failed:");
                if (err instanceof UserError) {
                    req.flash('error', err.getMessage());
                    errorPrint(err.getMessage());
                    res.status(err.getStatus());
                    res.redirect(err.getRedirectURL());
                } else {
                    next(err);
                }
            })
    }
    else {
        req.flash('error', 'User Error: the enetered information is NOT valid!\nPlease follow the instruction to enter valid information!');
        errorPrint("User Error: the enetered information is NOT valid!\nPlease follow the instruction to enter valid information!");
        res.status(200);
        res.redirect("/registration");
    }
})

router.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    if (/[a-zA-Z]/.test(username.charAt(0))
        && username.replace(/[^a-zA-Z0-9]/).length >= 3
        && password.length >= 8
        && /[A-Z]/.test(password)
        && /[0-9]/.test(password)
        && /[^\w]/.test(password)
        && password.length != 0) {
        // Validate the input again to make sure everything works fine
        let userId;
        db.execute("select id, username, password from users where username=?", [username])
            .then(([results, fields]) => {
                if (results && results.length == 1) {
                    userId = results[0].id;
                    return bcrypt.compare(password, results[0].password);
                } else {
                    throw new UserError("User error: Unmatched username!", "/login", 200)
                }
            })
            .then((matched) => {
                if (matched) {
                    req.flash('success', 'You are now LOGGED IN!');
                    successPrint(`User ${username} is logged in`);
                    req.session.username = username;
                    req.session.userId = userId;
                    res.redirect('/');
                } else {
                    throw new UserError("User error: Unmatched password!", "/login", 200)
                }
            })
            .catch((err) => {
                errorPrint("User login failed:");
                if (err instanceof UserError) {
                    req.flash('error', err.getMessage());
                    errorPrint(err.getMessage());
                    res.status(err.getStatus());
                    res.redirect(err.getRedirectURL());
                } else {
                    next(err);
                }
            })
    } else {
        req.flash('error', 'User Error: the enetered information is NOT valid!');
        errorPrint("User Error: the enetered information is NOT valid!");
        res.status(200);
        res.redirect("/login");
    }
})

router.post('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            errorPrint("Session could NOT be destroyed");
            next(err);
        } else {
            successPrint("Session was destroyed");
            res.clearCookie("csid");
            res.json({ status: "OK", message: "user is logged out" });
        }
    });
});

module.exports = router;
