const request = require('supertest');
const mongoose = require('mongoose');
const {
    MongoMemoryServer,
} = require('mongodb-memory-server');

const firebaseAuth = require('firebase-admin/auth');

const verifyIdTokenMock = vi.fn();

vi.spyOn(
    firebaseAuth,
    'getAuth'
).mockReturnValue({
    verifyIdToken: verifyIdTokenMock,
});

// App trebuie importată după mock-ul Firebase.
const app = require('../app');
const Challenge = require('../models/Challenge');
const User = require('../models/User');

let mongoServer;

beforeAll(async () => {
    mongoServer =
        await MongoMemoryServer.create();

    const mongoUri =
        mongoServer.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(() => {
    vi.clearAllMocks();

    verifyIdTokenMock.mockResolvedValue({
        uid: 'firebase-admin-id',
        email: 'admin@test.com',
    });
});

afterEach(async () => {
    await Challenge.deleteMany({});
    await User.deleteMany({});
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();

    vi.restoreAllMocks();
});

describe('GET /api/challenges', () => {
    it('returns status 200 and a list of challenges', async () => {
        await Challenge.create({
            title: 'Test challenge',
            targetSteps: 1000,
        });

        const response =
            await request(app).get(
                '/api/challenges'
            );

        expect(response.status).toBe(200);

        expect(
            Array.isArray(
                response.body.challenges
            )
        ).toBe(true);

        expect(
            response.body.challenges
        ).toHaveLength(1);

        expect(
            response.body.challenges[0]
                .title
        ).toBe('Test challenge');

        expect(
            response.body.currentPage
        ).toBe(1);

        expect(
            response.body.totalChallenges
        ).toBe(1);

        expect(
            response.body.hasMore
        ).toBe(false);
    });
});

describe('POST /api/challenges', () => {
    it('returns status 400 when title is missing', async () => {
        await User.create({
            firebaseUid:
                'firebase-admin-id',
            email: 'admin@test.com',
            role: 'admin',
        });

        const response = await request(app)
            .post('/api/challenges')
            .set(
                'Authorization',
                'Bearer valid-test-token'
            )
            .send({
                targetSteps: 1000,
            });

        expect(
            verifyIdTokenMock
        ).toHaveBeenCalledWith(
            'valid-test-token'
        );

        expect(response.status).toBe(400);
    });
});