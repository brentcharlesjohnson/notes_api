const app = require('../server');
const supertest = require('supertest');
const { sequelize } = require('../sequelize');
const request = supertest(app); 

beforeAll(async () => {
    await sequelize.sync();
});

afterAll(async (done) => {
    sequelize.close(done);
});

describe('Sample Test', () => {
    it('Gets the notes endpoint', async () => {
        const response = await request.get('/api/notes');
        expect(response.statusCode).toBe(200);
    }, 9999);
});
