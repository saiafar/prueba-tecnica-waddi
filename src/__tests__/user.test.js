import request from "supertest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {expect, jest, test} from '@jest/globals';
import { faker } from "@faker-js/faker";
import app from "../app.js";
import { User } from "../models/User.js";
import roles from "../helpers/roles.js";



let testAdminUser;
let testUser;
let testTokenAdmin;

describe('AUTH', () => {
    beforeAll( async () => {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash("mypass.123", salt);
        
        testAdminUser = {
            id: faker.datatype.number(),
            username: faker.internet.userName(),
            password: hashPassword,
            role: roles.admin
        }

        testUser = {
            id: faker.datatype.number(),
            username: faker.internet.userName(),
            password: hashPassword,
            role: roles.writer
        }

        testTokenAdmin = await jwt.sign({ id: testAdminUser.id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
    });

    describe('User Login', () => {
        test('User Login Success', async () => {
            const userSpy = jest.spyOn(User, 'findOne')
            userSpy.mockReturnValue(testAdminUser);
            const response = await request(app).post('/login').send({
                username: testAdminUser.username,
                password: "mypass.123"
            })
            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
            
            expect(response.body.token).toBeDefined();
        });

        test('User Login Failed ', async () => {
            const response = await request(app).post('/login').send({
                username: testAdminUser.username,
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
            jest.spyOn(User, 'create').mockReturnValue(testUser);
            jest.spyOn(User, 'findByPk').mockReturnValue(testAdminUser);
            jest.spyOn(User, 'findOne').mockReturnValue(null);
            const response =  await request(app).post('/register').send({
                username: "New User",
                password: "12578654",
                role: roles.writer
            })
            .set('Authorization', 'Bearer '+testTokenAdmin)
            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
            expect(response.body.id).toBeDefined();
        })

        test('Register failed token invalid', async () => {
            const response =  await request(app).post('/register').send({
                username: testUser.username,
                password: "mypass.123",
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
