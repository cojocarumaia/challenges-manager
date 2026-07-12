const request = require('supertest');

const app = require('../app');
const Challenge = require('../models/Challenge');

describe('GET /api/challenges', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns status 200 and a list of challenges', async () => {
        vi.spyOn(Challenge, 'find').mockResolvedValue([]);

        const response = await request(app).get('/api/challenges');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});