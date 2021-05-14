var express = require('express');
var router = express.Router();
const UserModel = require('../models/Users');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');

router.post('/register', (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let cPassword = req.body.cPassword;
    // Validate the data in the server side
    if (/[a-zA-Z]/.test(username.charAt(0))
        && username.replace(/[^a-zA-Z0-9]/).length >= 3
        && /\w@.+\w\.\w/.test(email)
        && password.length >= 8
        && /[A-Z]/.test(password)
        && /[0-9]/.test(password)
        && /[^\w]/.test(password)
        && password == cPassword
        && password.length != 0) {
        UserModel.usernameExists(username)
            .then((userExists) => {
                if (userExists) {
                    throw new UserError("User Error: username already exists", "/registration", 200)
                } else {
                    return UserModel.emailExists(email)
                }
            })
            .then((emailExists) => {
                if (emailExists) {
                    throw new UserError("User Error: email already exists", "/registration", 200)
                } else {
                    return UserModel.create(username, password, email)
                }
            })
            .then((createdId) => {
                if (createdId < 0) {
                    throw new UserError("Server Error: user could NOT be created", "/registration", 500)
                } else {
                    req.flash('success', 'User was created successfully!!!');
                    successPrint("A new user was created!!!");
                    req.session.save((err) => {
                        res.redirect('/login');
                    });
                }
            })
            .catch((err) => {
                errorPrint("Registraction failed: ");
                if (err instanceof UserError) {
                    req.flash('error', err.getMessage());
                    errorPrint(err.getMessage());
                    res.status(err.getStatus());
                    req.session.save((err) => {
                        res.redirect(err.getRedirectURL());
                    });
                } else {
                    next(err);
                }
            })
    }
    else {
        req.flash('error', 'User Error: the enetered information is NOT valid!');
        errorPrint("User Error: the enetered information is NOT valid!");
        res.status(200);
        req.session.save((err) => {
            res.redirect("/registration");
        });
    }
})

router.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    // Validate the data in the server side
    if (/[a-zA-Z]/.test(username.charAt(0))
        && username.replace(/[^a-zA-Z0-9]/).length >= 3
        && password.length >= 8
        && /[A-Z]/.test(password)
        && /[0-9]/.test(password)
        && /[^\w]/.test(password)
        && password.length != 0) {
        UserModel.authenticate(username, password)
            .then((userId) => {
                if (userId > 0) {
                    req.flash('success', 'You are now LOGGED IN!');
                    successPrint(`User ${username} is logged in`);
                    req.session.username = username;
                    req.session.userId = userId;
                    res.locals.logged = true;
                    req.session.save((err) => {
                        res.redirect('/');
                    });
                } else {
                    throw new UserError("User error: Unmatched username and password!", "/login", 200)
                }
            })
            .catch((err) => {
                errorPrint("Login Failed:");
                if (err instanceof UserError) {
                    req.flash('error', err.getMessage());
                    errorPrint(err.getMessage());
                    res.status(err.getStatus());
                    req.session.save((err) => {
                        res.redirect(err.getRedirectURL());
                    });
                } else {
                    next(err);
                }
            })
    } else {
        req.flash('error', 'User Error: the enetered information is NOT valid!');
        errorPrint("User Error: the enetered information is NOT valid!");
        res.status(200);
        req.session.save((err) => {
            res.redirect("/login");
        });
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
