const mongoose = require('mongoose');
const mysql = require('mysql');
const CONFIG = require('../config');

//require mongoose model => Register Model
require('./posts.model');
require('./usersSchema.model');

const options = {
    user: CONFIG.DBUSR,
    pass: CONFIG.DBPWD,
    authSource: CONFIG.AUTHSRC,
    useNewUrlParser: true
}


mongoose.connect(CONFIG.DBURL, options);
let db = mongoose.connection; 

db.on('error', function () {
    console.log("Db Connection Failed via MONGOOSE");
});

db.once('open', function () {
    console.log("db connection successfull via MONGOOOSE");
});

process.on('SIGINT', () => {
    gfshutdown('SIGINT', function () {
        process.exit(0);
    });
});


function gfshutdown(signal, callback) {
    mongoose.connection.close(function () {
        console.log(`mongoose connection is DISCONNECTED BY APP Termination Signal : ${signal}`);
        callback();
    });
}