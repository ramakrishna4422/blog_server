const mongoose = require('mongoose');
const log4js = require("log4js")
var Posts = mongoose.model('Posts');
const multer = require("multer");
// const upload = multer({dest : "uploads/"})

module.exports.getAllPosts = function (req, res, next) {
    console.log(req.url);
    console.log(req.query);

    let offset = 0;
    let count = 20; //minimum three products showcase

    //logic of pagenation
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(count = req.query.count, 10);
    }

    Posts
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, posts) {
            if (err) {
                console.log(err);
                res
                    .status(404)
                    .json({
                        message: "product not found",
                        error: err
                    });
            }
            else {
                console.log(posts.length);
                res
                    .status(200)
                    .set('Content-Type', 'application/json')
                    .json(posts);
            }
        });
}

