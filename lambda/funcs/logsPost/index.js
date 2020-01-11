'use strict';

const {
  parseInput,
  auth,
  db,
  errorOf,
  UserError,
} = require('./utils');

exports.handler = async event => {
  try {
    const {
      appId,
      Authorization,
      data,
    } = await parseInput(event, 'appId,Authorization,data');
    if (!Authorization.startsWith('Basic ')) {
      throw new UserError('invalid authorization format', 401);
    }
    const token = Authorization.substr(6);
    await auth(db, appId, token);
    const doc = db.collection(`apps/${appId}/logs`).add(data);
    return {
      statusCode: 200,
      body: doc,
    };
  } catch (err) {
    if (err instanceof UserError) return errorOf(err.statusCode, err.message);
    return errorOf(500, process.env.DEV === 'true' ? err.message : 'Internal Server Error');
  }
};
