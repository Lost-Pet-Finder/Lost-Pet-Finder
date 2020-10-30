var admin = require('firebase-admin');

const googleCredentials = require('../../firebaseCredentials.json');

admin.initializeApp({
    credential: admin.credential.cert(googleCredentials),
    databaseURL: `https://${process.env.FIREBASE_DB_NAME}.firebaseio.com`
});

console.log('[Firebase] Connecting to Firebase');

module.exports = admin;