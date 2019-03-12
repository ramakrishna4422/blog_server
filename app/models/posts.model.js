const mongoose = require('mongoose');

var postsSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : String,
    descr : String,
    likes : Number,
    postedOn : {
        type : Date,
        default: Date.now 
    }
})

module.exports =  mongoose.model('Posts', postsSchema, 'posts');