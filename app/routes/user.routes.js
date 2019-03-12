const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users.controller');
const authCtrl = require('../middleware/auth.ctrl');

router
    .route('/new')
    .post(userCtrl.userRegistration);

router
    .route('/login')
    .post(userCtrl.loginUser);

router
    .route('/addPost/:userId')
    .put(authCtrl.tokenValidator, userCtrl.addPost)

router
    .route('/:userId')
    .get(userCtrl.getOneUser)

module.exports = router;