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
    var appId = event.params.path.app_id;
    let isValidToken = await db.doc(`apps/${appId}`).get()
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
    
    var shouldBlock = await db.collection(`apps/${appId}/logs`)
        .orderBy('timestamp', 'desc').offset(10).limit(1).get().then(qs => {
            return qs.docs.length === 1 &&
                   qs.docs[0].data().timestamp.toMillis() >= data.timestamp.toMillis() - 1000;
        });
        
    if (shouldBlock) {
        // TODO
    }
        
        
    // return db.collection(`apps/${event.params.path.app_id}/logs`).add(data)
    //     .then((res) => {
    //         return resOf(200, 'success');
    //     }).catch((err) => {
    //         return resOf(500, 'failed');
    //     });
};