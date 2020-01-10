'use strict';

exports.handler = async () => {
  const res = {
    statusCode: 200,
    body: {
      message: 'echo back',
    },
  };
  return res;
};
