'use strict';

const {
  parseInput,
  auth,
  db,
  errorOf,
  UserError,
  isBlocked,
} = require('./utils');

exports.handler = async (event) => {
  try {
    const {
      appId,
      Authorization,
      ip,
    } = await parseInput(event, 'appId,Authorization,ip');
    if (!Authorization.startsWith('Basic ')) {
      throw new UserError('invalid authorization format', 401);
    }
    const token = Authorization.substr(6);
    
    await auth(db, appId, token);
    const resBlocked = await isBlocked(db, appId, ip);
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
