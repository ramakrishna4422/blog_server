const chai = require('chai');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

const Product = require('../../app/models/products.model');
const productJson = require('../helper/product.json');
let imgPath = "./assets/images/mobiles.png";

describe('Products Model Test Block', () => {
    //using EXCEPT method
    var product = new Product(productJson);
    it("Test for Product Model Property existance using EXCEPT", () => {
        expect(product).to.be.a("object");
        expect(product).to.have.property("name");
        expect(product).to.have.property("image");
        expect(product).to.have.property("subcategory");
        expect(product.subcategory[0]).to.have.property("sub");
        expect(product.subcategory[0].sub[0]).to.have.property("name");
        expect(product.subcategory[0].sub[0]).to.have.property("image");
        expect(product.subcategory[0].sub[0]).to.have.property("date");
        expect(product.subcategory[0].sub[0]).to.have.property("model");
        expect(product.subcategory[0].sub[0]).to.have.property("location");
        expect(product.subcategory[0].sub[0]).to.have.property("details");
        expect(product.subcategory[0].sub[0]).to.have.property("price");
    });

    // using SHOULD method
    it("Test for Product Model Property existance using SHOULD", () => {
        product.should.be.a("object");
        product.should.have.property("name");
        product.should.have.property("image");
        product.should.have.property("subcategory").with.lengthOf(1);
        product.subcategory[0].should.have.property("sub");
        product.subcategory[0].should.have.property("name");
        product.subcategory[0].should.have.property("image");
        product.subcategory[0].sub[0].should.have.property("name");
        product.subcategory[0].sub[0].should.have.property("image");
        product.subcategory[0].sub[0].should.have.property("date");
        product.subcategory[0].sub[0].should.have.property("model");
        product.subcategory[0].sub[0].should.have.property("location");
        product.subcategory[0].sub[0].should.have.property("details");
        product.subcategory[0].sub[0].should.have.property("price");
    });

    it("Test for Product Model Type Evaluation Happy Flow", () => {
        product.name.should.be.a("string");
        product.image.should.be.a("string")
        product.subcategory.should.be.a("array").with.lengthOf(1);
        product.subcategory[0].name.should.be.a("string");
        product.subcategory[0].image.should.be.a("string");
        product.subcategory[0].sub.should.be.a("array");
        product.subcategory[0].sub[0].name.should.be.a("string");
        product.subcategory[0].sub[0].image.should.be.a("string");
        product.subcategory[0].sub[0].date.should.be.a("string");
        product.subcategory[0].sub[0].model.should.be.a("string");
        product.subcategory[0].sub[0].location.should.be.a("string");
        product.subcategory[0].sub[0].details.should.be.a("string");
        product.subcategory[0].sub[0].price.should.be.a("string");
    });

    it("Test for Product Model Data Exist Happy Flow", () => {
        product.name.should.equal("mobiles");
        product.image.should.equal(imgPath);
        product.subcategory[0].name.should.equal("Mobile Phones");
        product.subcategory[0].image.should.equal("./assets/images/mobiles/phones.png");
        product.subcategory[0].sub[0].name.should.equal("Moto (Indigo Black, 3GB RAM, 32GB Storage)");
        product.subcategory[0].sub[0].image.should.equal("");
        product.subcategory[0].sub[0].date.should.equal("");
        product.subcategory[0].sub[0].model.should.equal("Moto E5 Plus");
        product.subcategory[0].sub[0].location.should.equal("india,hyderabad");
        product.subcategory[0].sub[0].price.should.equal("11,999.00");

    });
})
