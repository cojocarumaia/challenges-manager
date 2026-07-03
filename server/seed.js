require("dotenv").config();

const mongoose = require("mongoose");
const Challenge = require("./models/Challenge");

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected!");


        await Challenge.deleteMany({});


        await Challenge.create([
            {
                title: "Morning Walk",
                description: "Walk every morning",
                targetSteps: 5000,
                startDate: new Date(),
                endDate: new Date(),
            },
            {
                title: "Evening Walk",
                description: "Walk every evening",
                targetSteps: 10000,
                startDate: new Date(),
                endDate: new Date(),
            },
            {
                title: "Summer Challenge",
                description: "Walk 100k steps",
                targetSteps: 100000,
                startDate: new Date(),
                endDate: new Date(),
            },
            {
                title: "Mountain Challenge",
                description: "Reach 100k steps",
                targetSteps: 100000,
                startDate: new Date(),
                endDate: new Date(),
            },
        ]);


        const challenges = await Challenge.find();
        console.log(challenges);

        await mongoose.disconnect();
        console.log("Disconnected!");
    } catch (error) {
        console.log(error);
    }
}

seed();