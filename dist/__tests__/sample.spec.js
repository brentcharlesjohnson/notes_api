"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const sequelize_1 = require("../sequelize");
const request = supertest_1.default(server_1.default);
/*
 * tests could be improved by mocking the database connection
 * tests are brittle because they are not isolated
 */
describe('CRUD operations for Note', () => {
    beforeAll(async () => {
        await sequelize_1.sequelize.sync();
    });
    afterAll(async (done) => {
        sequelize_1.sequelize.close();
        return done;
    });
    it('Should create a new note', async () => {
        const response = await request
            .post('/api/notes')
            .send({
            title: "Testing 1, 2, 3",
            message: "Lorem ipsum"
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('note');
    });
    it('Should get a note', async () => {
        const response = await request
            .get('/api/notes/1');
        expect(response.status).toBe(200);
    });
    it('Should list all notes', async () => {
        const response = await request
            .get('/api/notes');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });
    it('Should update a note', async () => {
        const response = await request
            .put('/api/notes/1')
            .send({
            title: "Test updated"
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('note');
        expect(response.body.note).toHaveProperty('title', 'Test updated');
    });
    it('Should return status code 400 if db constraints are violated.', async () => {
        const response = await request
            .put('/api/notes/1')
            .send({
            message: null
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
    });
    it('Should delete a note', async () => {
        const response = await request
            .delete('/api/notes?id=1');
        expect(response.status).toBe(200);
    });
    it('Should respond with status code 404 if resource is not found.', async () => {
        const response = await request
            .get('/api/notes/1');
        expect(response.status).toBe(404);
    });
});
