const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../app');
const Challenge = require('../models/Challenge');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
});

afterEach(async () => {
    await Challenge.deleteMany({});
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('GET /api/challenges', () => {
    it('returns status 200 and a list of challenges', async () => {
        await Challenge.create({
            title: 'Test challenge',
            targetSteps: 1000,
        });

        const response = await request(app).get('/api/challenges');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe('Test challenge');
    });
});

describe('POST /api/challenges', () => {
    it('returns status 400 when title is missing', async () => {
        const response = await request(app)
            .post('/api/challenges')
            .send({
                targetSteps: 1000,
            });

        expect(response.status).toBe(400);
    });
});