var express = require('express');
var router = express.Router();
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const { create } = require('../models/Comments')

router.post('/create', (req, res, next) => {
    if (req.session.username) {
        let { comment, postId } = req.body;
        let username = req.session.username;
        let userId = req.session.userId;

        create(comment, userId, postId)
            .then((success) => {
                if (success == -1) {
                    errorPrint("Comment was not saved!");
                    res.json({
                        code: -1,
                        resultsStatus: "error",
                        message: "Comment was not saved!"
                    });
                } else {
                    successPrint(`A comment was created from ${username}`);
                    res.json({
                        code: 1,
                        resultsStatus: "success",
                        message: "A comment was created",
                        comment: comment,
                        username: username
                    });
                }
            })
            .catch((err) => next(err))
    } else {
        errorPrint("User must be logged in to comment!");
        res.json({
            code: -1,
            resultsStatus: "error",
            message: "User must be logged in to comment!"
        });
    }
})

module.exports = router;