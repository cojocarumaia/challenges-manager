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
async function getMyParticipations(req, res) {
    try {
        const user = await User.findOne({
            firebaseUid: req.user.uid,
        });

        if (!user) {
            return res.status(404).json({
                message: 'User profile not found',
            });
        }

        const participations =
            await Participation.find({
                user: user._id,
            }).select('challenge totalSteps');

        return res.json(participations);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}
async function addSteps(req, res) {
    try {
        const { challengeId } = req.params;
        const { steps } = req.body;

        if (
            typeof steps !== 'number' ||
            steps <= 0
        ) {
            return res.status(400).json({
                message:
                    'Steps must be a positive number',
            });
        }

        const user = await User.findOne({
            firebaseUid: req.user.uid,
        });

        if (!user) {
            return res.status(404).json({
                message:
                    'User profile not found',
            });
        }

        const participation =
            await Participation.findOne({
                user: user._id,
                challenge: challengeId,
            });

        if (!participation) {
            return res.status(404).json({
                message:
                    'Participation not found',
            });
        }

        participation.totalSteps += steps;

        await participation.save();

        return res.json(participation);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    joinChallenge,
    getMyParticipations,
    addSteps,
};