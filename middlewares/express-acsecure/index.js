const request = require('request');

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

const acsecure = (appId, token, forbiddenCallback) => (
  (req, res, next) => {
    const log = {
      ip: ipOf(req),
      method: req.method,
      path: req.path,
      body: req.body,
      params: req.params,
    };

    request.post(
      ENDPOINT,
      { json: { appId, token, log } },
      (err, _, resBody) => {
        if (err) next(err);
        const { statusCode, body } = resBody;
        if (statusCode != 200) {
          next(new AccessSecureConfigError(body.body.msg));
        } else if (body.isBlocked) {
          forbiddenCallback(res);
        } else {
          next();
        }
      }
    );
  }
);

module.exports = acsecure;