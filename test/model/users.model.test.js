const chai = require("chai")
const expect = chai.expect;
const should = chai.should();

var Users = require('../../app/models/usersSchema.model');
var userjson = require('../helper/user.json');

var user = new Users(userjson)