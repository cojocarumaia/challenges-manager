require('dotenv').config();

const connectDB = require('./db');
const Challenge = require('./models/Challenge');

async function seedChallenges() {
    try {
        await connectDB();

        // Șterge challenge-urile existente
        await Challenge.deleteMany({});

        const challenges = [];

        for (let index = 1; index <= 40; index++) {
            challenges.push({
                title: `Challenge ${index}`,
                description: `Description for challenge ${index}`,
                targetSteps: 5000 + index * 250,
                startDate: new Date(),
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

                image: `https://picsum.photos/seed/challenge${index}/800/400`,
            });
        }

        await Challenge.insertMany(challenges);

        console.log('40 challenges created successfully.');

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seedChallenges();