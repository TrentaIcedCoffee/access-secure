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
      log,
    } = await parseInput(event, 'appId,Authorization,log');

    const doc = await auth(db, appId, Authorization)
      .then(() => db.collection(`apps/${appId}/logs`).add(log));

    return {
      statusCode: 200,
      body: {
        message: `log posted with id: ${doc.id}`,
      },
    };
  } catch (err) {
    /* istanbul ignore else */
    if (err instanceof UserError) return errorOf(err.statusCode, err.message);
    /* istanbul ignore next */
    return errorOf(500, process.env.DEV === 'true' ? err.message : 'Internal Server Error');
  }
};
