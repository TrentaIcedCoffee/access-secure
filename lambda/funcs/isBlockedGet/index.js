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
  return parseInput(event, 'appId,Authorization,ip')
    .then(data => {
      const { appId, Authorization, ip } = data;
      if (!Authorization.startsWith('Basic ')) {
        throw new UserError('invalid authorization format', 401);
      }
      const token = Authorization.substr(6);
      return Promise.all([auth(db, appId, token), isBlocked(db, appId, ip)]);
    })
    .then(res => {
      return {
        statusCode: 200,
        body: {
          message: res[1].toString(),
        },
      };
    })
    .catch(err => {
      if (err instanceof UserError) return errorOf(err.statusCode, err.message);
      return errorOf(500, err.message);
    });
};
