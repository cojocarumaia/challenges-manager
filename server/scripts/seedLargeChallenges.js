require('dotenv').config();

const mongoose = require('mongoose');
const Challenge = require('../models/Challenge');

async function seedLargeChallenges() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Challenge.deleteMany({
            title: { $regex: '^Large Image Challenge' },
        });

        const challenges = Array.from(
            { length: 20 },
            (_, index) => ({
                title: `Large Image Challenge ${index + 1}`,
                description:
                    'Challenge created to test the loading performance of very large images.',
                targetSteps: 5000 + index * 500,
                startDate: new Date(),
                endDate: new Date(
                    Date.now() +
                    (index + 1) *
                    24 *
                    60 *
                    60 *
                    1000
                ),
                image: `https://picsum.photos/seed/challenge-${index + 1}/4000/3000`,
            })
        );

        await Challenge.insertMany(challenges);

        console.log(
            '20 challenges with large images were created successfully.'
        );
    } catch (error) {
        console.error(
            'Failed to create challenges:',
            error
        );
    } finally {
        await mongoose.disconnect();
    }
}

seedLargeChallenges();