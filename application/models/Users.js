var db = require('../config/database');
var bcrypt = require('bcrypt');
const UserModel = {};

UserModel.create = (username, password, email) => {
    return bcrypt.hash(password, 5)
        .then((hashedPassword) => {
            let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?,?,?,now())";
            return db.execute(baseSQL, [username, email, hashedPassword])
        })
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                return Promise.resolve(results.insertId)
            } else {
                return Promise.resolve(-1)
            }
        })
        .catch((err) => Promis.reject(err))
}

UserModel.usernameExists = (username) => {
    let baseSQL = "SELECT * FROM users WHERE username=?";
    return db.execute(baseSQL, [username])
        .then(([results, fields]) => {
            return Promise.resolve(!(results && results.length == 0))
        })
        .catch((err) => Promise.reject(err))
}

UserModel.emailExists = (email) => {
    return db.execute("SELECT * FROM users WHERE email=?", [email])
        .then(([results, fields]) => {
            return Promise.resolve(!(results && results.length == 0))
        })
        .catch((err) => Promise.reject(err))
}

UserModel.authenticate = (username, password) => {
    let userId;
    let baseSQL = "SELECT id, username, password FROM users WHERE username=?";
    return db.execute(baseSQL, [username])
        .then(([results, fields]) => {
            if (results && results.length == 1) {
                userId = results[0].id;
                return bcrypt.compare(password, results[0].password);
            } else {
                return Promise.reject(-1)
            }
        })
        .then((passwordMatches) => {
            if (passwordMatches) {
                return Promise.resolve(userId);
            } else {
                return Promise.resolve(-1)
            }
        })
        .catch((err) => Promise.resolve(err))
}

module.exports = UserModel;