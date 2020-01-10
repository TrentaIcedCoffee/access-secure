'use strict';

const chai = require('chai');
chai.should();
chai.use(require('chai-as-promised'));

const handler = require('../funcs/echoGet/').handler;

describe('#echoGet', () => {
  it('should be fulfilled', () => handler().should.be.fulfilled);
  
  it('should resolved with statusCode 200', () => {
    return handler().then(res => res.statusCode.should.equal(200));
  });
  
  it('should resolved with message "echo back"', () => {
    return handler().then(res => res.body.should.deep.equal({
      message: 'echo back',
    }));
  });
});