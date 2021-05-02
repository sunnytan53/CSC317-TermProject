const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const routeProtector = {};

routeProtector.userIsLoggedIn = (req, res, next) => {
    if (req.session.username) {
        successPrint('user is logged in');
        next();
    } else {
        errorPrint('user is NOT logged in');
        req.flash('error', 'You must be logged in to create a post!');
        res.redirect('/login');
    }
}

module.exports = routeProtector;
