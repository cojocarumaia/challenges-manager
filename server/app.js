const express = require('express');
const cors = require('cors');

const challengesRoutes = require('./routes/challenges');

const app = express();


const allowedOrigins = [
    'http://localhost:5173',
    'https://challenges-manager.web.app',
];

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error('Not allowed by CORS'));
        },
    })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/challenges', challengesRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use((err, req, res, _next) => {
    console.error(err);

    res.status(500).json({
        message: 'Internal Server Error',
    });
});

module.exports = app;