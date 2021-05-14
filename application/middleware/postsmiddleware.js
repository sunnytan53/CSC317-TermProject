var db = require('../config/database');
const postMiddleware = {};

postMiddleware.getRecentPosts = function (req, res, next) {
    db.execute('select id, title,  description, thumbnail, created from posts order by created desc limit 8')
        .then(([results, fields]) => {
            res.locals.results = results;
            if (results && results.length == 0) {
                req.flash('error', 'There are NO post created yet!');
            }
            next();
        })
        .catch((err) => next(err));
}

module.exports = postMiddleware;