'use strict';

const {
  parseInput,
  auth,
  db,
  errorOf,
  UserError,
  isSpamming,
} = require('./utils');

exports.handler = async event => {
  try {
    const {
      appId,
      Authorization,
      ip,
    } = await parseInput(event, 'appId,Authorization,ip');

    const resIsSpamming = await auth(db, `apps/${appId}`, Authorization).
      then(() => isSpamming(db, `apps/${appId}`, ip));

    return {
      statusCode: 200,
      body: {
        message: resIsSpamming.toString(),
      },
    };
  } catch (err) {
    /* istanbul ignore else */
    if (err instanceof UserError) return errorOf(err.statusCode, err.message);
    /* istanbul ignore next */
    console.warn(err.message);
    /* istanbul ignore next */
    return errorOf(500, 'Internal Server Error');
  }
};
