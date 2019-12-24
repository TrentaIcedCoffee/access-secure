'use strict';

var handler = require('./index.js').handler;

handler({
    'body-json': {
        'token': 'sdfa', 
        'data': {
            'field_0': 'value_0', 
            'field_1': 'value_1'
        },
        'ip': '0.0.0.10', 
        'method': 'POST', 
        'path':'admin', 
        'referrer': 'asdf', 
        'response_status': 200,
        'username': 'xindfas'
    },
    'params': {
        'path': {
            'app_id': 'fasdfsdf'
        }
    }
}).then(res => console.log(res)).catch(err => console.log(err));