
const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    description : String,
    likes : Number
})
const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    posts : [postsSchema]
});
module.exports = mongoose.model('Users', usersSchema, 'users');