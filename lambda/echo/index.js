'use strict';

exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('echo back'),
    };
    return response;
};
