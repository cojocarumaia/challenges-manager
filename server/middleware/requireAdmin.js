const User = require('../models/User');

async function requireAdmin(
    req,
    res,
    next
) {
    try {
        const user = await User.findOne({
            firebaseUid: req.user.uid,
        });

        if (!user) {
            return res.status(401).json({
                message:
                    'Not authenticated',
            });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({
                message: 'Not allowed',
            });
        }

        next();
    } catch {
        return res.status(500).json({
            message:
                'Internal server error',
        });
    }
}

module.exports = requireAdmin;