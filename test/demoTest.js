const assert = require('assert');

function add(num1, num2) {
    return num1 + num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

function showData(data) {
    return data;
}


var expected = add(20, 30);
var actual = 50;
assert(expected == actual, "20 + 30 gives equal to 50");
assert(add(20, 30) != 20, "20 + 30 gives equal to 50");
// assert(add(20, 30) == 50, "20 + 30 gives equal to 50");

assert.equal(50, add(20, 30)); // It takes two values
// assert.equal(20, add(20, 30));

// assert.deepEqual(actaul, expect) // it will compare two values
assert.deepEqual(50, add(20, 30))
// assert.deepEqual(40, add(20, 30))

// assert.deepStrictEqual("50", add(20, 30))
assert.notEqual(20, add(20, 30));
assert.notDeepEqual(20, add(20, 30));
assert.notDeepStrictEqual(20, add(20, 30));
assert.notStrictEqual("20", add(20, 30));

//it () is a block which takes only one test case
it("Running Test for Addition Functionality 20 + 50 = 50", function () {
    assert(expected == actual, "20 + 30 gives equal to 50");
});

it("Running Test for Addition Functionality 20 + 50 = 50", function () {
    assert(50 == add(20, 30), "20 + 30 gives equal to 50");
});

//describe block which takes group of test cases which are related each other

describe("addition Block testcase", function () {
    //it () is a block which takes only one test case
    it("Running Test for Addition Functionality 20 + 50 = 50", function () {
        assert(expected == actual, "20 + 30 gives equal to 50");
    });

    it("Running Test for Addition Functionality 20 + 50 = 50", function () {
        assert(50 == add(20, 30), "20 + 30 gives equal to 50");
    });
})

describe("show data block", ()=>{
    it("Print given data as ' hello every one' ok", ()=>{
        assert.equal('hello every one', showData('hello every one'))
    })

    it("Print given data as ' hello every ' ok", ()=>{
        assert.notEqual('hello every ', showData('hello every one'))
    })
})