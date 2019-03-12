"use strict";
require('./app/models/db.connect'); // for mongoose third party framework
const CONFIG = require('./app/config');
const path = require('path');
const express = require('express');
const fs = require('fs');
const userRoutes = require('./app/routes/user.routes');
const postsRoutes = require('./app/routes/posts.routes');

const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();

app.use(cors());

// allows urlencoded data for parsing
app.use(bodyParser.urlencoded({ extended: false }));

//allows json data
app.use(bodyParser.json());

app.use(bodyParser.raw({ 'type': "application/json" }));

// app.use(express.static(path.join(__dirname, 'app/views')));


//print every request in server.
app.use(function (req, res, next) {
    console.log(req.method, req.url);

    //allow cros origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,x-access-token,Accept");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Mrthods', 'POST, PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    //call next methods in pipeline
    next();
});


app.use(function (req, res, next) {
    console.log(req.method + "==" + req.originalUrl);
    next();
});

// app.use('/', routes);
app.use('/users', userRoutes);
app.use('/api', postsRoutes);

 app.listen(CONFIG.PORT, CONFIG.HOST, function () {
        console.log(`Server is Running at http://${CONFIG.HOST}:${CONFIG.PORT}`);
    });

