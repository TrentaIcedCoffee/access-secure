'use strict';

const chai = require('chai');
chai.should();
chai.use(require('chai-as-promised'));

const { db } = require('../../funcs/logsPost/utils');
const handler = require('../../funcs/logsPost/').handler;

describe('#logsPost', () => {
  const
    eventOf = (Authorization, appId, log) => {
      return {
        headers: { Authorization },
        queryParams: {},
        pathParams: { appId },
        body: { log },
      };
    },
    appId = 'test',
    token = 'token',
    ip = '0.0.0.0';

  before(() => {
    return db.collection('apps').doc('test').set({
      token: 'token',
    });
  });

  after(() => {
    return db.collection('apps').doc('test').delete();
  });

  it('should return 200 with posted id', () => {
    const event = eventOf(`Basic ${token}`, appId, { ip });
    return handler(event).then(res => {
      res.statusCode.should.be.equal(200);
      res.body.message.should.be.an('string').and.satisfy(
        msg => msg.startsWith('log posted with id: ')
      );
    });
  });

  it('should return 401 for Bad Auth format', () => {
    const event = eventOf(`Bearer ${token}`, appId, { ip });
    return handler(event).then(res => {
      res.statusCode.should.be.equal(401);
      res.body.message.should.be.equal('invalid authorization format');
    });
  });
});
