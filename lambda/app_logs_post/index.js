'use strict';

var admin = require('firebase-admin');

var serviceAccount = require('./resources/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

var db = admin.firestore();

var resOf = (statusCode, message) => {
    return {
        statusCode: statusCode,
        body: {
            message: message
        }
    };
};

exports.handler = async (event) => {
    let isValidToken = await db.doc(`apps/${event.params.path.app_id}`).get()
        .then(doc => {
            return doc.exists && doc.data().token === event['body-json'].token;
        }).catch(() => {
            return false;
        });
    if (!isValidToken) {
        return resOf(400, 'app validation failed');
    }
    
    var data = event['body-json'];
    delete data.token;
    data.timestamp = admin.firestore.Timestamp.now();
    
    return db.collection(`apps/${event.params.path.app_id}/logs`).add(data)
        .then((res) => {
            return resOf(200, 'success');
        }).catch((err) => {
            return resOf(500, 'failed');
        });
};