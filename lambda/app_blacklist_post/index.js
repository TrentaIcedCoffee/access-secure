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
    let isValidToken = await db.doc(`apps/${event.app_id}`).get()
        .then(doc => {
            return doc.exists && doc.data().token === event.token;
        })
        .catch(() => {
            return false;
        });
    if (!isValidToken) {
        return resOf(400, 'app validation failed');
    }
    
    return db.collection(`apps/${event.app_id}/blacklist`).doc(event.ip).set({
        ip: event.ip
    }).then(() => {
        return resOf(200, 'success');
    }).catch(() => {
        return resOf(500, 'failed');
    });
};