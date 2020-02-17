const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.json());

const acsecure = require('express-acsecure');

const appId = 'myAppId';
const appToken = 'myAppToken';
const forbiddenCallback = res => res.status(403).end();
app.use(acsecure(appId, appToken, forbiddenCallback));

app.get('/', (req, res) => res.json({ 'message': 'ok' }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));