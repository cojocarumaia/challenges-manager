const Participation = require(
    '../models/Participation'
);
const User = require('../models/User');

async function joinChallenge(req, res) {
    try {
        const { challengeId } = req.params;

        const user = await User.findOne({
            firebaseUid: req.user.uid,
        });

        if (!user) {
            return res.status(404).json({
                message:
                    'User profile not found',
            });
        }

        const existingParticipation =
            await Participation.findOne({
                user: user._id,
                challenge: challengeId,
            });

        if (existingParticipation) {
            return res.status(409).json({
                message: 'Already joined',
            });
        }

        const participation =
            await Participation.create({
                user: user._id,
                challenge: challengeId,
            });

        return res
            .status(201)
            .json(participation);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    joinChallenge,
};