'use strict';

const chai = require('chai');
chai.should();
chai.use(require('chai-as-promised'));

const { db } = require('../../funcs/isBlockedGet/utils');
const handler = require('../../funcs/isBlockedGet/').handler;

describe('#isBlockedGet', () => {
  const
    eventOf = (Authorization, appId, ip) => {
      return {
        headers: { Authorization },
        queryParams: { ip },
        pathParams: { appId },
        body: {},
      };
    },
    token = 'token',
    appId = 'test',
    Authorization = 'Basic token',
    ip = '0.0.0.0',
    ipBlocked = '0.0.0.1';

  const
    DEV = process.env.DEV;

  before(() => {
    process.env.DEV = 'true';
    return db.collection('apps').doc(appId).set({ token })
      .then(_ => db.collection(`apps/${appId}/blacklist`)
        .doc(ipBlocked).set({})
      );
  });

  after(() => {
    process.env.DEV = DEV;
    return db.collection('apps').doc(appId).delete();
  });

  it('should return 200,false (not blocked)', () => {
    const event = eventOf(Authorization, appId, ip);
    return handler(event).then(res => {
      res.statusCode.should.be.equal(200);
      res.body.message.should.be.equal('false');
    });
  });

  it('should return 200,true (blocked)', () => {
    const event = eventOf(Authorization, appId, ipBlocked);
    return handler(event).then(res => {
      res.statusCode.should.be.equal(200);
      res.body.message.should.be.equal('true');
    });
  });

  it('should return 400 missing keys', () => {
    const event = eventOf(Authorization, appId);
    return handler(event).then(res => {
      res.statusCode.should.be.equal(400);
      res.body.message.should.be.equal('missings: ip (400)');
    });
  });
});
