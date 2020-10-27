import app from '../server';
import supertest from 'supertest';
import { sequelize } from '../sequelize';

const request = supertest(app); 

/*
 * tests could be improved by mocking the database connection
 * tests are brittle because they are not isolated
 */

describe('CRUD operations for Note', () => {

    beforeAll(async () => {
        await sequelize.sync();
    });

    afterAll(async (done) => {
        sequelize.close();
        return done; 
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
            .delete('/api/notes?id=1');
        expect(response.statusCode).toBe(200); 
    });

    it('Should respond with status code 404 if resource is not found.', async () => {
        const response = await request
            .get('/api/notes/1');
        expect(response.statusCode).toBe(404);
    })
});
