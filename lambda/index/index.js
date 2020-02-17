'use strict';

const admin = require('firebase-admin');
const {
  UserError, parseInput, dbUtils,
} = require('./utils');
const serviceAccount = require('./resources/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});
const db = admin.firestore();
const Timestamp = admin.firestore.Timestamp;
const {
  auth, ipStatus, isSpamming, postLog, addToBlacklist,
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
    log.timestamp = Timestamp.now();

    await auth(appId, token);

    const { inBlacklist, inWhitelist } = await ipStatus(appId, log.ip);

    if (inBlacklist) {
      return ok(true, `${log.ip} banned for blacklist`);
    }

    if (!inWhitelist && await isSpamming(appId, log.ip)) {
      await addToBlacklist(appId, log.ip);
      return ok(true, `${log.ip} banned for spamming`);
    }

    await postLog(appId, log);

    return ok(false, 'ok');
  } catch (err) {
    /* istanbul ignore else */
    if (err instanceof UserError) return userError(err.message);
    /* istanbul ignore next */
    console.warn(err.message);
    /* istanbul ignore next */
    return serverError(500, 'Internal Server Error');
  }
};
