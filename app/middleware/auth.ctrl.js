const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config');


module.exports.tokenValidator = (req, res, next) => {
    var token = req.headers['x-access-token'];
    console.log(token);

    if (!token) {
        res
            .status(404)
            .set('application/json')
            .json({
                auth: false,
                message: "Not Found Token !",
                token: null
            });
        console.log("token", token);
    } else {
        //TOKEN VERIFICATION
        jwt.verify(token, CONFIG.SECRETKEY, function (err, doc) {
            if (err) {
                res
                    .status(401)
                    .set('application/json')
                    .json({
                        auth: false,
                        message: "Failed to Authenticate, Token Invalid !",
                        token: null
                    });
            } else {
                Users
                    .findById({ _id: doc._id }, function (err, user) {
                        if (err) {
                            res
                                .status(400)
                                .set('application/json')
                                .json({
                                    err: err,
                                    msg: "Email not found Please Signup!!",
                                });
                        } if (!user) {
                            res
                                .status(500)
                                .set('application/json')
                                .json({
                                    err: "server error",
                                    msg: "emial not found Please Signup!!",
                                });

                        } else {
                            next();
                        }
                    });
            }
        })
    }
}


//ROLE VALIDATOR
module.exports.roleValidator = (req, res, next) => {
    if (!req.body || !req.body.email || !req.body.password) {
        res
            .status(400)
            .set('application/json')
            .json({
                err: "Server error",
                msg: "Required fields are missing"
            });
    } else {
        Users
            .findOne({ email: req.body.email })
            .then(user => {

                if (!user) {
                    res
                        .status(200)
                        .set('application/json')
                        .json({
                            msg: "user not found"
                        });
                } else {
                    var isPwd = bcrypt.compareSync(req.body.password, user.password);
                    if (isPwd) {
                        if (user.role === 'admin') {
                            res
                                .status(200)
                                .set('application/json')
                                .json({
                                    msg: "You have ADMIN role"
                                });
                        } else if (user.role === 'user') {
                            res
                                .status(200)
                                .set('application/json')
                                .json({
                                    msg: "You have USER role"
                                });
                        }
                        else {
                            res
                                .status(200)
                                .set('application/json')
                                .json({
                                    msg: "You DO NOT have role"
                                });
                        }
                    }
                }
            })
            .catch(err => {
                res
                    .status(400)
                    .set('application/json')
                    .json({
                        err: err,
                        msg: "user not found"
                    });
            })
    }
}