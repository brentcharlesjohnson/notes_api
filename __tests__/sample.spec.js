const app = require('../server');
const supertest = require('supertest');
const { sequelize } = require('../sequelize');
const request = supertest(app); 

describe('CRUD operations for Note', () => {

    beforeAll(async () => {
        await sequelize.sync();
    });

    afterAll(async (done) => {
        sequelize.close(done);
    });

    it('Should create a new note', async () => {
        const response = await request
            .post('/api/notes')
            .send({
                title: "Testing 1, 2, 3",
                message: "Lorem ipsum"
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('note');
    });

    it('Should get a note', async () => {
        const response = await request
            .get('/api/notes/1');
        expect(response.statusCode).toBe(200);
    });

    it('Should list all notes', async () => {
        const response = await request
            .get('/api/notes');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    it('Should update a note', async () => {

        const response = await request
            .put('/api/notes/1')
            .send({
                title: "Test updated"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('note');
        expect(response.body.note).toHaveProperty('title', 'Test updated');
    });

    it('Should return status code 400 if db constraints are violated.', async () => {
        const response = await request
            .put('/api/notes/1')
            .send({
                message: null 
            });
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
    });

    it('Should delete a note', async () => {
        const response = await request
            .delete('/api/notes/1');
        expect(response.statusCode).toBe(200); 
    });

    it('Should respond with status code 404 if resource is not found.', async () => {
        const response = await request
            .delete('/api/notes/1');
        expect(response.statusCode).toBe(404);
    })
});
