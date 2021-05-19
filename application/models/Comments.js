var db = require('../config/database');
const CommentModel = {};

CommentModel.create = (comment, userId, postId) => {
    let baseSQL = 'INSERT INTO comments (comment, fk_authorid, fk_postid) VALUES (?,?,?)';
    return db.query(baseSQL, [comment, userId, postId])
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                return Promise.resolve(results.insertId)
            } else {
                return Promise.resolve(-1)
            }
        })
        .catch((err) => Promise.reject(err))
}

CommentModel.getCommentsForPost = (postId) => {
    let baseSQL = 'SELECT u.username, c.id, c.comment, c.created FROM comments c JOIN users u ON u.id=c.fk_authorid WHERE c.fk_postid=? ORDER BY c.created DESC';
    return db.query(baseSQL, [postId])
        .then(([results, fields]) => {
            return Promise.resolve(results)
        })
        .catch((err) => Promise.reject(err))
}

module.exports = CommentModel;