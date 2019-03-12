const chai = require('chai');

var assert = chai.assert;
var expect = chai.expect;
var name = "john";
var user = {
    name : "john",
    email : "john@gmail.com",
    password : "john123",
    age : 28
}

let phones = [900000, 800000];

function getUser(){
    return user;
}

describe("User Test Block", ()=>{
    it("Get User data Test Happy Flow", ()=>{
        assert.equal("john", name);
        assert.equal(user, getUser());
        expect(getUser()).to.have.property('name')
    })

    it("Type User data Test Happy Flow", ()=>{
        assert.typeOf(name, "string");
        assert.typeOf(user, "object");
        assert.typeOf(user.name, "string");
        assert.typeOf(user.age, "number");
    });

    it("Type User data Test Happy Flow", ()=>{
        assert.typeOf(phones, "array");
        assert.lengthOf(phones, 2);
    });
})