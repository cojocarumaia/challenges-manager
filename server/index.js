require('dotenv').config();

const app = require('./app');
const connectDB = require('./db');

const port = 4000;

(async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
})();