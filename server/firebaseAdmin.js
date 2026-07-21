const {
    cert,
    getApps,
    initializeApp,
} = require('firebase-admin/app');

const serviceAccount = process.env.FIREBASE_PRIVATE_KEY
    ? {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey:
            process.env.FIREBASE_PRIVATE_KEY.replace(
                /\\n/g,
                '\n'
            ),
    }
    : require(
        './secrets/challenges-manager-firebase-adminsdk-fbsvc-3018f878e1.json'
    );

if (getApps().length === 0) {
    initializeApp({
        credential: cert(serviceAccount),
    });
}

module.exports = require('firebase-admin');