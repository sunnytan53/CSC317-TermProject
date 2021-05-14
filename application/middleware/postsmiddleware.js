var PostModel = require('../models/Posts')
const postMiddleware = {};

postMiddleware.getRecentPosts = async function (req, res, next) {
    try {
        let results = await PostModel.getRecentPosts(8);
        res.locals.results = results;
        if (results.length == 0) {
            req.flash('error', 'There are NO post created yet!');
        }
        next();
    } catch (err) {
        next(err)
    }

    //db.execute('select id, title,  description, thumbnail, created from posts order by created desc limit 8')
    //    .then(([results, fields]) => {
    //        res.locals.results = results;
    //        if (results && results.length == 0) {
    //            req.flash('error', 'There are NO post created yet!');
    //        }
    //        next();
    //    })
    //    .catch((err) => next(err));
}

module.exports = postMiddleware;