const express = require('express');
const app = express();

app.use(express.json());

const port = 4000;

require('dotenv').config();
const connectDB = require('./db');
const challengesRoutes = require('./routes/challenges');

app.use('/api/challenges', challengesRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((err, req, res) => {
  console.error(err);

  res.status(500).json({
    message: 'Internal Server Error',
  });
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
