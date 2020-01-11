'use strict';

const chai = require('chai');
chai.should();
chai.use(require('chai-as-promised'));

const handler = require('../../funcs/echoGet/').handler;

describe('#echoGet', () => {
  it('should return "echo back"', () => {
    return handler().should.eventually.deep.equal({
      statusCode: 200,
      body: { message: 'echo back' },
    });
  });
});
