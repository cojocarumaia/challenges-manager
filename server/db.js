const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB');
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;
