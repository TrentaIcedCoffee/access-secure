'use strict';

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
    res = {};

  keys.forEach(key => {
    const val = event.params.path[key] !== undefined ?
      event.params.path[key] : event['body-json'][key];
    if (val === undefined) {
      missings.push(key);
      return;
    }
    res[key] = val;
  });

  return new Promise((resolve, reject) => {
    if (missings.length) reject(new Error(`missings: ${missings.join(',')}`));
    resolve(res);
  });
};

const admin = require('firebase-admin');
const serviceAccount = require('./resources/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});
const db = admin.firestore();

const auth = async (db, appId, token) => {
  return new Promise((resolve, reject) => {
    db.collection('apps').doc(appId).get()
      .then(doc => {
        if (doc.exists && doc.data().token === token) resolve();
        reject(new Error('app token not match'));
      });
  });
};

module.exports = {
  parseInput,
  errorOf,
  db,
  auth,
};
