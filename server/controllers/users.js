const User = require('../models/User');

async function createUser(req, res) {
    try {
        const { firebaseUid, email } = req.body;

        if (!firebaseUid || !email) {
            return res.status(400).json({
                message: 'Firebase UID and email are required.',
            });
        }

        const existingUser = await User.findOne({
            firebaseUid,
        });

        if (existingUser) {
            return res.status(200).json(existingUser);
        }

        const user = await User.create({
            firebaseUid,
            email,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

async function getUserByFirebaseUid(req, res) {
    try {
        const { firebaseUid } = req.params;

        const user = await User.findOne({
            firebaseUid,
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        res.json(user);
    } catch {
        res.status(500).json({
            message: 'Server error',
        });
    }
}

module.exports = {
    createUser,
    getUserByFirebaseUid,
};