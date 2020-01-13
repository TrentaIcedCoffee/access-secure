'use strict';

const chai = require('chai');
const _ = require('lodash');
const expect = chai.expect;
chai.should();
chai.use(require('chai-as-promised'));

const {
  UserError,
  errorOf,
  parseInput,
  db,
  Timestamp,
  deleteDoc,
  deleteCollection,
  auth,
  isBlocked,
  isSpamming,
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
        'missings: errHeader,errPath,errQuery,errBody (400)'
      );
  });

  it('should throw error conflicts', () => {
    return parseInput(eventConflict, 'appId')
      .should.be.rejectedWith(
        UserError,
        'conflicts: appId (400)'
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

// db utils

describe('#deleteDoc', () => {
  const
    doc0 = 'zero/0',
    collection1 = 'zero/0/one',
    doc1 = 'zero/0/one/1',
    collection2 = 'zero/0/one/1/two',
    doc2 = 'zero/0/one/1/two/2';

  beforeEach(() => {
    return Promise.all([
      db.doc(doc0).set({}),
      db.doc(doc1).set({}),
      db.doc(doc2).set({}),
    ]);
  });

  afterEach(() => {
    return Promise.all([
      db.doc(doc0).delete(),
      db.doc(doc1).delete(),
      db.doc(doc2).delete(),
    ]);
  });

  it('should delete recursively', () => {
    return deleteDoc(db, doc0)
      .then(() => Promise.all([
        db.doc(doc0).get(),
        db.collection(collection1).get(),
        db.doc(doc1).get(),
        db.collection(collection2).get(),
        db.doc(doc2).get(),
      ]))
      .then(lst => lst.map((val, idx) => {
        return idx % 2 === 0 ? !val.exists : val.empty;
      }))
      .then(lst => lst.forEach(val => val.should.be.true));
  });
});

describe('#deleteCollection', () => {
  const
    collection0 = 'zero',
    doc0 = 'zero/0',
    collection1 = 'zero/0/one',
    doc1 = 'zero/0/one/1';

  beforeEach(() => {
    return Promise.all([
      db.doc(doc0).set({}),
      db.doc(doc1).set({}),
    ]);
  });

  afterEach(() => {
    return Promise.all([
      db.doc(doc0).delete(),
      db.doc(doc1).delete(),
    ]);
  });

  it('should delete recursively', () => {
    return deleteCollection(db, collection0)
      .then(() => Promise.all([
        db.collection(collection0).get(),
        db.doc(doc0).get(),
        db.collection(collection1).get(),
        db.doc(doc1).get(),
      ]))
      .then(lst => lst.map((val, idx) => {
        return idx % 2 === 0 ? val.empty : !val.exists;
      }))
      .then(lst => lst.forEach(val => val.should.be.true));
  });
});

describe('#auth', () => {
  const
    appPath = 'apps/test',
    token = 'token',
    Authorization = 'Basic token',
    AuthorizationErrformat = 'Bearer token',
    AuthorizationErrtoken = 'Basic wrongToken';

  before(() => {
    return db.doc(appPath).set({ token });
  });

  after(() => {
    return db.doc(appPath).delete();
  });

  it('should be fulfilled', () => {
    return auth(db, appPath, Authorization).should.be.fulfilled;
  });

  it('should throw Authorization invalid format', () => {
    return auth(db, appPath, AuthorizationErrformat)
      .should.be.rejectedWith(
        UserError,
        'Authorization invalid format (401)'
      );
  });

  it('should throw token not match', () => {
    return auth(db, appPath, AuthorizationErrtoken)
      .should.be.rejectedWith(
        UserError,
        'app token not match (401)'
      );
  });
});

describe('#isBlocked', () => {
  const
    appPath = 'apps/test',
    ip = '0.0.0.0',
    ipBlocked = '0.0.0.1';

  before(() => {
    return db.collection(`${appPath}/blacklist`).doc(ipBlocked).set({});
  });

  after(() => {
    return db.collection(`${appPath}/blacklist`).doc(ipBlocked).delete({});
  });

  it('should return false (not blocked)', () => {
    return isBlocked(db, appPath, ip).should.be.eventually.equal(false);
  });

  it('should return true (blocked)', () => {
    return isBlocked(db, appPath, ipBlocked).should.be.eventually.equal(true);
  });
});

describe('#isSpamming', () => {
  const
    appPath = 'apps/test',
    ip = '0.0.0.0',
    ipSpamming = '0.0.0.1';

  before(() => {
    const
      ts = Timestamp.fromDate(new Date()),
      batch = db.batch();

    _.times(6, () => batch.set(
      db.collection(`${appPath}/logs`).doc(),
      { ip: ipSpamming, timestamp: ts }
    ));

    _.times(5, () => batch.set(
      db.collection(`${appPath}/logs`).doc(),
      { ip, timestamp: ts }
    ));

    return batch.commit();
  });

  after(() => {
    const batch = db.batch();
    return db.collection(`${appPath}/logs`).listDocuments()
      .then(docs => docs.forEach(doc => batch.delete(doc)))
      .then(() => batch.commit());
  });

  it('should detect spamming', () => {
    return isSpamming(db, appPath, ipSpamming)
      .then(res => res.should.be.true);
  });

  it('should detect not spamming', () => {
    return isSpamming(db, appPath, ip)
      .then(res => res.should.be.false);
  });
});
