const mongoose = require('mongoose');
const server = require('../../server');
const chai = require('chai');
const chai_http = require('chai-http')

var assert = chai.assert;
var except = chai.expect;
var should = chai.should();

var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmVjNDcyZDY4MDg4MzY1OTAxMWY2NzciLCJpYXQiOjE1NDI4MDkxMjMsImV4cCI6MTU0Mjg5NTUyM30.xswnXz7_ogfejwimPWPYUqbPFS8uoJuzzx9bANgmBIw";

chai.use(chai_http);
describe("Products Controller Black", () => {
    it("GET /products ==> It should GET all Products data Test", (done) => {
        chai
            .request('http://127.0.0.1:2020/api')
            .get('/products?offset=1&count=')
            .end((err, response) => {
                if(err){
                    err.should.have.status(404)
                }else{
                // console.log(response);
                response.should.be.json;
                response.should.have.status(200)
                response.body.should.be.a('array');
                response.type.should.equal("application/json")

                //verify propertis
                response.body[0].should.have.property('_id')
                response.body[0].should.have.property('name')
                response.body[0].should.have.property('image')
                response.body[0].should.have.property('subcategory')
                }

                done()
            }) // Ends the method
    });

    it("It should POST One Product data Test", (done) => {
        product = {
            name: "car",
            image: "images/cars/img1.jpg",
            subcategory: [{
                name: "Hyundai Verna",
                image: "images/cars/verna.jpg",
                sub: [{
                    name: "Hyundai Verna E 1.4",
                    image: "images/",
                    date: "11-11-2017",
                    model: "A777-200LR",
                    price: "7,00,000",
                    location: "hyderabad",
                    details: "The Hyundai Verna has been around......"
                }
                ]
            }]
        };

        chai
            .request('http://127.0.0.1:2020/api')
            .post('/products/new')
            .send(product)
            .end((err, response) => {
                product._id = response.body._id;
                console.log('===========>Product Id',product._id);
                
                // console.log(response);
                response.should.be.json;
                response.should.have.status(200)
                response.body.should.be.a('object');
                response.type.should.equal("application/json")

                console.log("..............response", response.body);
                // var productId = response.body._id;
                // console.log("..............productId", productId);

                //verify propertis
                response.body.should.have.property('_id')
                response.body.should.have.property('name')
                response.body.should.have.property('image')
                response.body.should.have.property('subcategory')
                done()
            }) // Ends the method
    });

    it("It should GET One Product data Test", (done) => {
        console.log('===========>Product Id',product._id);

        chai
            .request('http://127.0.0.1:2020/api')
            .get('/products/'+product._id)
            .end((err, response) => {
                response.should.be.json;
                response.should.have.status(200)
                response.body.should.be.a('object');
                response.type.should.equal("application/json")
                console.log("----------------------> resp-body"+response.body._id);

                //verify propertis
                response.body.should.have.property('_id')
                response.body.should.have.property('name')
                response.body.should.have.property('image')
                response.body.should.have.property('subcategory')

                // //verify subcategory lenght
                // response.body.should.have.property('name').to.equal("properties");
                // response.body.should.have.property('image').to.equal("/assets/images/properties/properties.png");
                // response.body.should.have.property('subcategory');
                // response.body.subcategory[0].should.have.property("name").to.equal("For Sale")
                // response.body.subcategory[0].should.have.property("image").to.equal("./assets/images/properties/sale.png")
                // response.body.subcategory[0].should.have.property("sub").with.lengthOf(0);
                done();
            }) // Ends the method
    });
})

describe("Products Controller Test all Functionalities", (done) => {

    // UPDARE PRODUCT TEST
    it("It should PUT for Update One Product data Test", () => {
        chai
            .request('http://127.0.0.1:2020/api')
            .put('/products/update/'+product._id)
            .send({ name: "sample books" })
            .set('x-access-token', token)
            .end((err, response) => {
                // console.log(response);
                response.should.be.json;
                response.should.have.status(200)
                response.body.should.be.a('object');
                response.type.should.equal("application/json")

                console.log("..............response", response.body);

                //verify propertis
                except(response.body).to.have.property("name");
                except(response.body).to.have.property("image");
                except(response.body).to.have.property("subcategory").with.lengthOf(0);
                done();
            }) // Ends the method
    });

    // DELETE PRODUCT TEST
    it("It should DELETE for delete One Product data Test", (done) => {
        chai
            .request('http://127.0.0.1:2020/api')
            .delete('/products/delete/'+product._id)
            .set('x-access-token', token)
            .end((err, response) => {
                // console.log(response);
                response.should.be.json;
                response.should.have.status(200)
                response.body.should.be.a('object');
                response.type.should.equal("application/json")

                console.log("..............response-body", response.body);
                done();
            }) // Ends the method
    });
});