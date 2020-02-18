const axios = require('axios');

const ENDPOINT = 'https://api.logsecure.io/';

class AccessSecureConfigError extends Error {
  constructor (message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const ipOf = req => (
  req.headers['x-forwarded-for'] || req.connection.remoteAddress
);

const acsecure = (appId, token) => async (ctx, next) => {
  const log = {
    ip: ipOf(ctx.req),
    method: ctx.request.method,
    path: ctx.request.path,
    body: ctx.request.body || {},
    params: ctx.request.params || {},
    query: ctx.request.query || {},
  };

  const res = await axios.post(ENDPOINT, { appId, token, log });
  const { statusCode, body } = res.data;
  if (statusCode != 200) throw new AccessSecureConfigError(body.msg);
  else if (body.isBlocked) ctx.throw(403);
  else await next();
};

module.exports = acsecure;