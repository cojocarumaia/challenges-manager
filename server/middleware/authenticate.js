const admin = require('../firebaseAdmin');

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
            await admin
                .auth()
                .verifyIdToken(token);

        req.user = decodedToken;

        next();
    } catch {
        return res.status(401).json({
            message:
                'Not authenticated',
        });
    }
}

module.exports = authenticate;