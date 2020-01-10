'use strict';

exports.handler = async () => {
  const res = {
    statusCode: 200,
    body: JSON.stringify('echo back'),
  };
  return res;
};
