'use strict';

const _ = require('lodash');

class UserError extends Error {
  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
  }
}

const parseInput = async (event, keyStr) => {
  /* MUST use with passThrough */
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

const dbUtils = db => {
  const _deleteAll = async t => {
    const
      stack = new Array(t),
      batch = db.batch();

    while (stack.length) {
      const { path, type } = stack.pop();
      if (type === 'docRef') {
        batch.delete(db.doc(path));
        await db.doc(path).listCollections().then(colRefs => {
          colRefs.forEach(colRef => {
            stack.push({ path: `${path}/${colRef.id}`, type: 'colRef' });
          });
        });
      } else {
        await db.collection(path).listDocuments().then(docRefs => {
          docRefs.forEach(docRef => {
            stack.push({ path: `${path}/${docRef.id}`, type: 'docRef' });
          });
        });
      }
    }
    return batch.commit();
  };

  const deleteDoc = async path => {
    return _deleteAll(db, { path, type: 'docRef' }); // DocumentReference
  };

  const deleteCollection = async path => {
    return _deleteAll(db, { path, type: 'colRef' }); // CollectionReference
  };

  const auth = async (appId, token) => {
    if (!_.isString(token) && !_.isEmpty(token)) {
      throw new UserError(`token misformat, token: ${token}`);
    }
    await db.doc(`apps/${appId}`).get()
      .then(doc => {
        if (!(doc.exists && doc.data().token === token)) {
          throw new UserError('app token not match');
        }
      });
  };

  const ipStatus = async (appId, ip) => {
    const [ inBlacklist, inWhitelist ] = await Promise.all([
      db.doc(`apps/${appId}/blacklist/${ip}`).get().then(doc => doc.exists),
      db.doc(`apps/${appId}/whitelist/${ip}`).get().then(doc => doc.exists),
    ]);
    return { inBlacklist, inWhitelist };
  };

  const isSpamming = async (appId, ip) => {
    const res = await db.collection(`apps/${appId}/logs`)
      .where('ip', '==', ip).orderBy('timestamp', 'desc')
      .limit(4)
      .get()
      .then(qs => {
        if (qs.size === 4) {
          const
            end = qs.docs[0].data().timestamp.toDate(),
            start = qs.docs[qs.size - 1].data().timestamp.toDate();
          return end - start < 1000;
        }
        return false;
      });
    return res;
  };

  const postLog = async (appId, log) => {
    await db.collection(`apps/${appId}/logs`).add(log);
  };

  const addToBlacklist = async (appId, ip) => {
    await db.collection(`apps/${appId}/blacklist`).doc(ip).set({});
  };

  return {
    deleteDoc, deleteCollection, auth, ipStatus, isSpamming, postLog,
    addToBlacklist,
  };
};

module.exports = {
  UserError,
  parseInput,
  dbUtils,
};
