const express = require('express');
const cors = require('cors');

const challengesRoutes = require('./routes/challenges');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/challenges', challengesRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: 'Internal Server Error',
    });
});

module.exports = app;