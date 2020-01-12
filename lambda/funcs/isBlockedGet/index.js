'use strict';

const {
  parseInput,
  auth,
  db,
  errorOf,
  UserError,
  isBlocked,
} = require('./utils');

exports.handler = async event => {
  try {
    const {
      appId,
      Authorization,
      ip,
    } = await parseInput(event, 'appId,Authorization,ip');

    const resBlocked = await auth(db, appId, Authorization).
      then(() => isBlocked(db, appId, ip));
      
    return {
      statusCode: 200,
      body: {
        message: resBlocked.toString(),
      },
    };
  } catch (err) {
    if (err instanceof UserError) return errorOf(err.statusCode, err.message);
    return errorOf(500, process.env.DEV === 'true' ? err.message : 'Internal Server Error');
  }
};
