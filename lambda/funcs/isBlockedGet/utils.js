'use strict';

const _ = require('lodash');

class UserError extends Error {
  constructor(msg, statusCode) {
    super(msg);
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

const admin = require('firebase-admin');
const serviceAccount = require('./resources/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});
const db = admin.firestore();

const auth = async (db, appId, token) => {
  await db.collection('apps').doc(appId).get()
    .then(doc => {
      if (doc.exists && doc.data().token === token) return;
      throw new UserError('app token not match');
    });
};

const Timestamp = admin.firestore.Timestamp;

const isBlocked = async (db, appId, ip) => {
  const res = await Promise.all([
    db.doc(`apps/${appId}/whitelist/${ip}`).get().then(doc => doc.exists),
    db.doc(`apps/${appId}/blacklist/${ip}`).get().then(doc => doc.exists),
  ]);
  return !res[0] && res[1];
};

module.exports = {
  parseInput,
  errorOf,
  db,
  auth,
  Timestamp,
  isBlocked,
  UserError,
};
