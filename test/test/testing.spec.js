// Example of a test

describe("A test suite", function() {
   beforeEach(function() { 
     console.log('before it\'s running');
   });
   afterEach(function() { 
     console.log('after it\'s running');
   });
   // it('should fail', function() { expect(true).to.be.false; });
   it('should pass', function() {
    expect(true).to.be.true;
   });
   it('should pass again', function() {
    expect(true).to.equal(true);
   })
});