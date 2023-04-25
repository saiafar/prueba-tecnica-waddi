import request from "supertest";
import app from "../app.js";
import roles from "../helpers/roles.js";


describe('Auth', () => {
    describe('User Login', () => {
        test('User Login Success', async () => {
            const response = await request(app).post('/login').send({
                username: "Administrador",
                password: "admin.pass23"
            })
            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
            expect(response.body.token).toBeDefined();
        });

        test('User Login Failed ', async () => {
            const response = await request(app).post('/login').send({
                username: "Administrador",
                password: "132132"
            })
            expect(response.status).toBe(400);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
            expect(response.body.message).toBeDefined();
        })
    })

    describe('Register User with Administrator login', () => {
        test('Register Success', async () => {
            const response =  await request(app).post('/register').send({
                username: "UsuarioWritersasa",
                password: "12578654",
                role: roles.writer
            })
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgyNDAzNTI1LCJleHAiOjE2ODI1NzYzMjV9.u2BBNc0end3LbrMAm_J_lJe_XZoTbhNPnyfjHLrMnhg')

            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
            expect(response.body.id).toBeDefined();
        })

        test('Register failed token invalid', async () => {
            const response =  await request(app).post('/register').send({
                username: "UsuarioWriter",
                password: "12578654",
                role: roles.writer
            })
            .set('Authorization', 'Bearer pZCI6MSwiaWF0IjoxNjgyNDAzNTI1LCJleHAiOjE2ODI1NzYzMjV9.u2BBNc0end3LbrMAm_J_lJe_XZoTbhNPnyfjHLrMnhg')

            expect(response.status).toBe(401);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
            expect(response.body.message).toBeDefined();
        })
    })

    
})