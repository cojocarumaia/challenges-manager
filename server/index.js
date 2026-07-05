const express = require('express');
const app = express();
const port = 4000;

require('dotenv').config();
const connectDB = require('./db');

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

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
