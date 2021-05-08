var express = require('express');
var router = express.Router();
var db = require('../config/database');
var { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
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

    if (fk_userid && title && description && fileUploaded) {
        sharp(fileUploaded)
            .resize(200)
            .toFile(destinationOfThumbnail)
            .then(() => {
                return db.execute("insert into posts (title, description, photopath, thumbnail, created, fk_userid) value (?,?,?,?,now(),?)",
                    [title, description, fileUploaded, destinationOfThumbnail, fk_userid]);
            })
            .then(([results, fields]) => {
                if (results && results.affectedRows) {
                    req.flash('success', 'Your post was created successfully!!!');
                    successPrint("Your post was created successfully!!!");
                    res.redirect('/');
                } else {
                    throw new PostError('Post Error: post could NOT be create!', '/postImage', 200);
                }
            })
            .catch((err) => {
                if (err instanceof PostError) {
                    req.flash('error', err.getMessage());
                    errorPrint(err.getMessage());
                    res.status(err.getStatus());
                    res.redirect(err.getRedirectURL());
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
        res.redirect("/postImage");
    }
})

module.exports = router;