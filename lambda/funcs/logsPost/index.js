'use strict';

var admin = require('firebase-admin');

var serviceAccount = require('./resources/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

var db = admin.firestore();

var okOf = (body={}) => {
    var res = {
        statusCode: 200,
        body: {
            message: 'success',
            isBlocked: false
        }
    };
    for (const [key, value] of Object.entries(body)) {
        res.body[key] = value;
    }
    return res;
};

const checkSpamming = async (appId, ip, curTs) => {
    const inWhitelist = await db.doc(`apps/${appId}/whitelist/${ip}`).get()
        .then((doc) => {
            return doc.exists;
        }).catch((err) => console.log(err));
    if (inWhitelist) {
        return false;
    }
    
    const isSpamming = await db.collection(`apps/${appId}/logs`)
        .orderBy('timestamp', 'desc').offset(3).limit(1).get().then(qs => {
            const curTime = curTs.toMillis();
            const prevTime = qs.docs.length === 1 ? qs.docs[0].data().timestamp.toMillis() : 0;
            return curTime - prevTime <= 1000;
        }).catch((err) => console.log(err));
    return isSpamming;
};

const validateToken = async (appId, token) => {
    return db.doc(`apps/${appId}`).get().then(doc => {
        return (doc.exists && doc.data().token === token);
    });
};

const parseInput = (event) => {
    var appId = event.params.path.app_id;
    var token = event['body-json'].token;
    
    var data = event['body-json'];
    delete data.token;
    data.timestamp = admin.firestore.Timestamp.now();
    return {appId: appId, token: token, data: data};
};

exports.handler = async (event) => {
    let {appId, token, data} = parseInput(event);
    
    return validateToken(appId, token).then((isValidToken) => {
        if (!isValidToken) {
            return {
                statusCode: 400,
                body: {
                    message: 'app not exists or token not valid'
                }
            };
        }
        return checkSpamming(appId, data.ip, data.timestamp)
            .then((isSpamming) => {
                if (isSpamming) {
                    return db.collection(`apps/${appId}/blacklist`).add({
                        ip: data.ip
                    }).then((res) => {
                        return okOf({
                            message: 'ip blocked for spamming',
                            isBlocked: true
                        });
                    });
                } else {
                    return db.collection(`apps/${appId}/logs`).add(data)
                        .then((res) => okOf());
                }
            });
    });
};