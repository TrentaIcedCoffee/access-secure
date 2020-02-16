'use strict';

const admin = require('firebase-admin');
const {
  UserError,
  parseInput,
  dbUtils,
} = require('./utils');
const serviceAccount = require('./resources/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});
const db = admin.firestore();
const Timestamp = admin.firestore.Timestamp;
const {
  deleteDoc,
  deleteCollection,
  auth,
  isBlocked,
  isSpamming,
  postLog,
} = dbUtils(db);

const userError = msg => ({
  statusCode: 400,
  body: { msg },
});
const serverError = msg => ({
  statusCode: 500,
  body: { msg },
});
const ok = (isBlocked, msg) => ({
  statusCode: 200,
  body: { isBlocked, msg },
});

exports.handler = async event => {
  try {
    const {
      appId,
      token,
      log,
    } = await parseInput(event, 'appId,token,log');

    if (!log.ip) throw new UserError('log missing ip');
    log.ts = Timestamp.now();

    return auth(db, appId, token)
      .then(() => isBlocked(db, `apps/${appId}`, log.ip))
      .then(res => {
        if (res) {
          return ok(true, `${log.ip} banned for blacklist`);
        } else {
          return isSpamming(db, `apps/${appId}`, log.ip);
        }
      })
      .then(res => {
        if (res) {
          return ok(true, `${log.ip} banned for spamming`);
        } else {
          return postLog(appId, log);
        }
      })
      .then(() => ok(false, 'ok'));
  } catch (err) {
    /* istanbul ignore else */
    if (err instanceof UserError) return userError(err.message);
    /* istanbul ignore next */
    console.warn(err.message);
    /* istanbul ignore next */
    return serverError(500, 'Internal Server Error');
  }
};
