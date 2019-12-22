'use strict';

var admin = require('firebase-admin');

var serviceAccount = require('./resources/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

var db = admin.firestore();

exports.handler = async (event) => {
    let isValidToken = await db.doc(`apps/${event.app_id}`).get()
        .then(doc => {
            return doc.exists && doc.data().token === event.token;
        })
        .catch(() => {
            return false;
        });
    if (!isValidToken) {
        return {
            statusCode: 400,
            body: {
                message: 'app validation failed'
            }
        };
    }
    
    let res = await db.collection(`apps/${event.app_id}/whitelist`).doc(event.ip).set({
        ip: event.ip
    }).then(() => {
        return {
            statusCode: 200,
            body: {
                message: 'success'
            }
        };
    }).catch(() => {
        return {
            statusCode: 400,
            body: {
                message: 'failed'
            }
        };
    });
    return res;
};