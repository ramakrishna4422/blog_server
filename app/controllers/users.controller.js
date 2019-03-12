const mongoose = require('mongoose');
const Users = mongoose.model('Users');
var Posts = mongoose.model('Posts');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config');
const multer = require("multer");
const upload = multer({dest : "uploads/"})

module.exports.userRegistration = function (req, res, next) {
    console.log(req.body);
    if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
        res
            .status(400)
            .set('application/json')
            .json({
                err: "Server error",
                msg: "Required fields are missing"
            });
    } else {
        
        //PASSWORD ENCRYPTION
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds)
        var hashPwd = bcrypt.hashSync(req.body.password, salt);

        var newuser = new Users({
            name: req.body.name,
            email: req.body.email,
            password: hashPwd, // ASSIGN ENCRYPTED PASSWORD
        });

        newuser
            .save(newuser)
            .then(user => {
                var token = jwt.sign({ _id: user._id }, CONFIG.SECRETKEY, { expiresIn: '1h' });
                res
                    .status(200)
                    .set('application/json')
                    .json({
                        id: user._id,
                        auth: true,
                        msg: "Registration Successful",
                        token: token // FOR AUTO LOGIN AFTER REGISTRATION
                    });
            })
            .catch(err => {
                res
                    .status(400)
                    .set('application/json')
                    .json({
                        err: "Server error",
                        msg: "Registration Failed",
                        errr: err
                    });
            });
    }
}


//LOGIN
module.exports.loginUser = function (req, res, next) {
    //PASSWORD DECRYPTION N COMPARISION
    if (!req.body || !req.body.email || !req.body.password) {
        res
            .status(500)
            .set('application/json')
            .json({
                err: "Server error",
                msg: "Required fields missing",
            });
    } else {
        Users
            .findOne({ email: req.body.email })
            .then(user => {
                var isPwd = bcrypt.compareSync(req.body.password, user.password)
                console.log(isPwd);
                if (isPwd) {
                    //TOKEN GENERATION ALONG WITH ID
                    // jwt.sign(payload, secretkey, options);
                    var token = jwt.sign({ _id: user._id }, CONFIG.SECRETKEY, { expiresIn: '1h' });
                    res
                        .status(200)
                        .set('application/json')
                        .json({
                            auth : true,
                            msg: "Login Successful!!",
                            id : user._id,
                            token: token
                        });
                } else {
                    res
                        .status(400)
                        .set('application/json')
                        .json({
                            msg: "Password not matched",
                        });
                }
            })
            .catch(err => {
                res
                    .status(400)
                    .set('application/json')
                    .json({
                        err: err,
                        msg: "Email not found Please Signup!!",
                    });
            })
    }
}

// add post
module.exports.addPost = async (req, res, next)=>{
    try{
    var id = req.params.userId
    var post = {
        title : req.body.title,
        description : req.body.description
    }
    var updateQuery = {
        $push : {posts : post}
    }
   var out =  await Users.findOneAndUpdate({_id : id}, updateQuery,  { new: true })
    
        console.log(out);
        
        var ln = out.posts.length-1;

        console.log("after post", out);
        console.log("after name", out.name);
        console.log("after title", out.posts[ln].title);
        console.log("after description", out.posts[ln].description);

        var newPost = new Posts({
            title : out.posts[ln].title,
            author : out.name,
            descr : out.posts[ln].description
        });
       var post = await newPost.save(newPost)
       console.log("hhhhhhhhhhh", post);
       
                res.status(200)
                .json({
                    msg : "your post is saved",
                    post : post
                })
    }catch(error){
        res
        .status(404)
        .json({
            msg : "post is not save",
            err : error
        })
    }
        
}

// get user
module.exports.getOneUser = (req, res, next)=>{
    console.log(req.params.userId);
    var userId = req.params.userId;
    Users.findById({_id : userId})
    .exec((err, user)=>{
        if(err){
            res.status(404).json({msg : "Internal Server Error"})
        }else{
            res.status(200).json({
                email : user.email,
                name : user.name,
                posts : user.posts
            })
        }
    })
    
}





