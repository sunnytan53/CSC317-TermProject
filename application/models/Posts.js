var db = require('../config/database');
const PostModel = {};

PostModel.create = (title, description, photopath, thumbnail, fk_userid) => {
    let baseSQL = "INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?,?,?,?,now(),?)"
    return db.execute(baseSQL, [title, description, photopath, thumbnail, fk_userid])
        .then(([results, fields]) => {
            return Promise.resolve(results && results.affectedRows)
        })
        .catch((err) => Promise.reject(err))
}

PostModel.search = (searchTerm) => {
    let baseSQL = "SELECT id, title, description, thumbnail, concat_ws(' ', title, description) AS haystack FROM posts HAVING haystack like ?";
    let searchTermSQL = "%" + searchTerm + "%";
    return db.execute(baseSQL, [searchTermSQL])
        .then(([results, fields]) => {
            return Promise.resolve(results)
        })
        .catch((err) => Promise.reject(err))
}

PostModel.getRecentPosts = (amount) => {
    let baseSQL = "SELECT id, title, description, thumbnail, created FROM posts ORDER BY created DESC LIMIT ?";
    return db.query(baseSQL, [amount])
        .then(([results, fields]) => {
            return Promise.resolve(results)
        })
        .catch((err) => Promise.reject(err))
}

PostModel.getPostById = (postId) => {
    let baseSQL = "SELECT u.username, p.title, p.description, p.photopath, p.created FROM users u JOIN posts p ON u.id = fk_userid WHERE p.id=?";
    return db.execute(baseSQL, [postId])
        .then(([results, fields]) => {
            return Promise.resolve(results)
        })
        .catch((err) => Promise.reject(err))
}

module.exports = PostModel;