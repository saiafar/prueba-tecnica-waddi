import app from "../src/app.js";
import request from "supertest";

describe('GET /users', () => {
    test('should responed with a 403 status code', async () => {
        const response = await request(app).get('/users').send();
        expect(response.status).toBe(403);
    }) 
})

describe('POST /login', () => {
    test('response token access', async () => {
        const response = (await request(app).post('/login')).send({
            username:
        });
    })
})