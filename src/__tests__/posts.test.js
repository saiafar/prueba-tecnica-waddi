import request from "supertest";
import app from "../app.js";

describe('Post', () => {
    describe('Get post list', () => {
        test('get all posts',  async () => {
            const response =  await request(app).get('/posts').send()
            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
        })
    })
})