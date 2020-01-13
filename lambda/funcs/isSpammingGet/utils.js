'use strict';

const _ = require('lodash');

class UserError extends Error {
  constructor(msg, statusCode) {
    super(`${msg} (${statusCode})`);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

const errorOf = (statusCode, message) => {
  return {
    statusCode,
    body: { message },
  };
};

const parseInput = async (event, keyStr) => {
  const
    keys = keyStr.split(','),
    missings = [],
    conflicts = [],
    res = {};

  keys.forEach(key => {
    const lst = [
      event.queryParams[key],
      event.pathParams[key],
      event.headers[key],
      event.body[key],
    ].filter(val => !_.isEmpty(val));
    if (lst.length > 1) conflicts.push(key);
    else if (lst.length === 0) missings.push(key);
    else res[key] = lst[0];
  });

  if (missings.length) {
    throw new UserError(`missings: ${missings.join(',')}`, 400);
  } else if (conflicts.length) {
    throw new UserError(`conflicts: ${conflicts.join(',')}`, 400);
  }
  return res;
};

/**
  doc: firebase doc ref
  col: firebase collection ref
*/

const admin = require('firebase-admin');
const serviceAccount = require('./resources/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});
const db = admin.firestore();

const Timestamp = admin.firestore.Timestamp;

const _deleteAll = async (db, t) => {
  const
    stack = new Array(t),
    batch = db.batch();

  while (stack.length) {
    const { path, type } = stack.pop();
    if (type === 'doc') {
      batch.delete(db.doc(path));
      await db.doc(path).listCollections().then(cols => {
        cols.forEach(col => {
          stack.push({ path: `${path}/${col.id}`, type: 'col' });
        });
      });
    } else {
      await db.collection(path).listDocuments().then(docs => {
        docs.forEach(doc => {
          stack.push({ path: `${path}/${doc.id}`, type: 'doc' });
        });
      });
    }
  }
  return batch.commit();
};

const deleteDoc = async (db, path) => {
  return _deleteAll(db, { path, type: 'doc' });
};

const deleteCollection = async (db, path) => {
  return _deleteAll(db, { path, type: 'col' });
};

const auth = async (db, appPath, Authorization) => {
  if (!_.isString(Authorization) || !Authorization.startsWith('Basic ')) {
    throw new UserError('Authorization invalid format', 401);
  }
  const token = Authorization.substr('Basic '.length);
  await db.doc(appPath).get()
    .then(doc => {
      if (doc.exists && doc.data().token === token) return;
      throw new UserError('app token not match', 401);
    });
};

const isBlocked = async (db, appPath, ip) => {
  const res = await Promise.all([
    db.doc(`${appPath}/whitelist/${ip}`).get().then(doc => doc.exists),
    db.doc(`${appPath}/blacklist/${ip}`).get().then(doc => doc.exists),
  ]);
  return !res[0] && res[1];
};

module.exports = {
  UserError,
  errorOf,
  parseInput,
  db,
  Timestamp,
  deleteDoc,
  deleteCollection,
  auth,
  isBlocked,
};
