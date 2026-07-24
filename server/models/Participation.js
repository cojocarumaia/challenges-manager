const mongoose = require('mongoose');

const participationSchema =
    new mongoose.Schema(
        {
            user: {
                type: mongoose.Schema.Types
                    .ObjectId,
                ref: 'User',
                required: true,
            },
            challenge: {
                type: mongoose.Schema.Types
                    .ObjectId,
                ref: 'Challenge',
                required: true,
            },
            totalSteps: {
                type: Number,
                default: 0,
                min: 0,
            },
        },
        {
            timestamps: true,
        }
    );

participationSchema.index(
    {
        user: 1,
        challenge: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model(
    'Participation',
    participationSchema
);