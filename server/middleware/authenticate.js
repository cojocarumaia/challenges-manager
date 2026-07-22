require('../firebaseAdmin');

const {
    getAuth,
} = require('firebase-admin/auth');

async function authenticate(
    req,
    res,
    next
) {
    const authHeader =
        req.headers.authorization;

    if (
        !authHeader ||
        !authHeader.startsWith(
            'Bearer '
        )
    ) {
        return res.status(401).json({
            message:
                'Not authenticated',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken =
            await getAuth().verifyIdToken(
                token
            );

        req.user = decodedToken;

        next();
    } catch (error) {
        console.error(
            'Firebase token verification failed:',
            error
        );

        return res.status(401).json({
            message:
                'Not authenticated',
        });
    }
}

module.exports = authenticate;