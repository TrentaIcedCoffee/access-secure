'use strict';

const {
  parseInput,
  db,
  auth,
  errorOf,
  UserError,
  isBlocked,
  isSpamming,
} = require('./utils');


const resBlocked = ip => ({
  statusCode: 401,
  body: {
    message: `ip: ${ip} blocked`,
  }
});

const resOk = () => ({
  statusCode: 200,
  body: {
    message: 'ok',
  }
});

exports.handler = async event => {
  try {
    const {
      appId,
      Authorization,
      log,
    } = await parseInput(event, 'appId,Authorization,log');

    return auth(db, `apps/${appId}`, Authorization)
      .then(() => isBlocked(db, `apps/${appId}`, log.ip))
      .then(res => res ? resBlocked(log.ip) : isSpamming(db, `apps/${appId}`, log.ip))
      .then(res => res ? resBlocked(log.ip) : db.collection(`apps/${appId}/logs`).add(log))
      .then(() => resOk());
  } catch (err) {
    /* istanbul ignore else */
    if (err instanceof UserError) return errorOf(err.statusCode, err.message);
    /* istanbul ignore next */
    console.warn(err.message);
    /* istanbul ignore next */
    return errorOf(500, 'Internal Server Error');
  }
};
