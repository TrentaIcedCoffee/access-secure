'use strict';

var handler = require('./index.js').handler;

handler({
    'app_id' : 'fasdfsdf',
    'ip': '0.0.0.1',
    'token': 'sdfa'
}).then(res => console.log(res)).catch(err => console.log(err));