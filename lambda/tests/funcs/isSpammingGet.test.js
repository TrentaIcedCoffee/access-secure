'use strict';

const chai = require('chai');
const _ = require('lodash');
chai.should();
chai.use(require('chai-as-promised'));

const {
  db,
  Timestamp,
  deleteDoc,
} = require('../../utils/utils');
const handler = require('../../funcs/isSpammingGet/').handler;

describe('#isSpammingGet', () => {
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
    ipSpamming = '0.0.0.1';

  before(() => {
    const
      ts = Timestamp.fromDate(new Date()),
      batch = db.batch();

    batch.set(db.doc(`apps/${appId}`), { token });

    _.times(6, () => batch.set(
      db.collection(`apps/${appId}/logs`).doc(),
      { ip: ipSpamming, timestamp: ts }
    ));

    _.times(5, () => batch.set(
      db.collection(`apps/${appId}/logs`).doc(),
      { ip, timestamp: ts }
    ));

    return batch.commit();
  });

  after(() => {
    return deleteDoc(db, `apps/${appId}`);
  });

  it('should return 200,false (not spamming)', () => {
    const event = eventOf(Authorization, appId, ip);
    return handler(event).then(res => {
      res.statusCode.should.be.equal(200);
      res.body.message.should.be.equal('false');
    });
  });

  it('should return 200,true (spamming)', () => {
    const event = eventOf(Authorization, appId, ipSpamming);
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
