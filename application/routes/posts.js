var express = require('express');
var router = express.Router();
var { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostModel = require('../models/Posts');
var PostError = require('../helpers/error/PostError');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/uploads");
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
})

var uploader = multer({ storage: storage });

router.post('/createPost', uploader.single("image"), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userid = req.session.userId;
    // Validate the data in the server side
    if (fk_userid && title && description && fileUploaded) {
        sharp(fileUploaded)
            .resize(200)
            .toFile(destinationOfThumbnail)
            .then(() => {
                return PostModel.create(title, description, fileUploaded, destinationOfThumbnail, fk_userid)
            })
            .then((postCreated) => {
                if (postCreated) {
                    req.flash('success', 'Your post was created successfully!!!');
                    successPrint("A new post was created");
                    req.session.save((err) => {
                        res.redirect('/');
                    });
                } else {
                    throw new PostError('Post Error: post could NOT be create!', '/postImage', 200);
                }
            })
            .catch((err) => {
                if (err instanceof PostError) {
                    req.flash('error', err.getMessage());
                    errorPrint(err.getMessage());
                    res.status(err.getStatus());
                    req.session.save((err2) => {
                        res.redirect(err.getRedirectURL());
                    });
                } else {
                    next(err);
                }
            })
    }
    else {
        let errorMessage;
        if (!fk_userId) {
            errorMessage = 'User Error: the user MUST be logged in to post!<\li>';
        }
        else if (!title) {
            errorMessage = 'Post Error: the title MUST be filled!';
        }
        else if (!description) {
            errorMessage = 'Post Error: the description MUST be filled!';
        }
        else {
            errorMessage = 'Post Error: the image MUST be uploaded!';
        }

        req.flash('error', errorMessage);
        errorPrint(errorMessage);
        res.status(200);
        req.session.save((err) => {
            res.redirect("/postImage");
        });
    }
})

router.get('/search', async (req, res, next) => {
    try {
        let searchTerm = req.query.search;
        if (searchTerm) {
            let results = await PostModel.search(searchTerm)
            if (results.length) {
                res.send({
                    resultsStatus: "success",
                    message: `${results.length} results found`,
                    results: results
                });
            } else {
                let results = await getRecentPosts(8);
                res.send({
                    resultsStatus: "error",
                    message: "No results found. Here are the 8 recent posts.",
                    results: results
                })
            }
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router;