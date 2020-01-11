'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-as-promised'));

const {
  parseInput,
  errorOf,
  db,
  auth,
  isBlocked,
  UserError,
} = require('../../utils/utils');

describe('#parseInput', () => {
  const
    event = {
      headers: { Authorization: 'Basic token' },
      queryParams: { ip: '0.0.0.0' },
      pathParams: { appId: 'test' },
      body: {
        log: {
          ip: '0.0.0.1',
          method: 'POST',
          path: 'admin',
          resStatus: 200,
        },
      },
    },
    eventConflict = {
      headers: {},
      queryParams: {},
      pathParams: { appId: 'test' },
      body: { appId: 'test' },
    };

  it('should flatten data (event)', () => {
    return parseInput(event, 'appId,Authorization,ip,log')
      .should.eventually.deep.equal({
        appId: 'test',
        Authorization: 'Basic token',
        ip: '0.0.0.0',
        log: {
          ip: '0.0.0.1',
          method: 'POST',
          path: 'admin',
          resStatus: 200,
        },
      });
  });

  it('should throw error missings', () => {
    return parseInput(event, 'errHeader,errPath,errQuery,errBody')
      .should.be.rejectedWith(
        UserError,
        'missings: errHeader,errPath,errQuery,errBody'
      );
  });

  it('should throw error conflicts', () => {
    return parseInput(eventConflict, 'appId')
      .should.be.rejectedWith(
        UserError,
        'conflicts: appId'
      );
  });
});

describe('#errorOf', () => {
  it('should return a 404 error', () => {
    expect(errorOf(404, 'page not found')).to.deep.equal({
      statusCode: 404,
      body: {
        message: 'page not found',
      },
    });
  });
});

describe('#db', () => {
  const
    appId = 'test',
    token = 'token',
    threshold = 5,
    errorToken = 'errorToken';

  before(() => {
    return db.collection('apps').doc(appId).set({ token, threshold });
  });

  after(() => {
    return db.collection('apps').doc(appId).delete();
  });

  describe('#auth', () => {
    it('should be fulfilled', () => {
      return auth(db, appId, token).should.be.fulfilled;
    });

    it('should throw error invalid token', () => {
      return auth(db, appId, errorToken)
        .should.be.rejectedWith(UserError, 'app token not match');
    });
  });

  describe('#isBlocked', () => {
    const
      ip = '0.0.0.0',
      ipBlocked = '0.0.0.1';

    before(() => {
      return db.collection(`apps/${appId}/blacklist`).doc(ipBlocked).set({
        timestamp: '',
      });
    });

    after(() => {
      return db.collection(`apps/${appId}/blacklist`).doc(ipBlocked).delete();
    });

    it('should return false (not blocked)', () => {
      return isBlocked(db, appId, ip).should.be.eventually.equal(false);
    });

    it('should return true (blocked)', () => {
      return isBlocked(db, appId, ipBlocked).should.be.eventually.equal(true);
    });
  });
});
