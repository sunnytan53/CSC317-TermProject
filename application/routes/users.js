var express = require('express');
var router = express.Router();
var db = require('../config/database');
var { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var UserError = require('../helpers/error/UserError');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

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
                    let baseSQL = "insert into users (username, email, password, created) values (?,?,?,now());";
                    return db.execute(baseSQL, [username, email, password]);
                } else {
                    throw new UserError("User Error: registration failed, email already exists", "/registration", 200);
                }
            })
            .then(([results, fields]) => {
                if (results && results.affectedRows) {
                    successPrint("User was created!!!")
                    res.redirect('/login');
                } else {
                    throw new UserError("Server Error: user could not be created", "/registration", 500);
                }
            })
            .catch((err) => {
                errorPrint("User could NOT be created for some reason!");
                if (err instanceof UserError) {
                    errorPrint(err.getMessage());
                    res.status(err.getStatus());
                    res.redirect(err.getRedirectURL());
                } else {
                    next(err);
                }
            })
    }
    else {
        errorPrint("User Error: the enetered information is NOT valid!\nPlease follow the instruction to enter valid information!");
        res.status(200);
        res.redirect("/registration");
    }
})

module.exports = router;
