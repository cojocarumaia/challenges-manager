require("dotenv").config();

const mongoose = require("mongoose");
const Challenge = require("./models/Challenge");

async function aggregation() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected!");

        const result = await Challenge.aggregate([
            {
                $match: {
                    targetSteps: { $gte: 100000 },
                },
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                },
            },
        ]);

        console.log(result);

        await mongoose.disconnect();
        console.log("Disconnected!");
    } catch (error) {
        console.log(error.message);
    }
}

aggregation();