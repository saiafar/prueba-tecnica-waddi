import request from "supertest";
import {jest} from '@jest/globals';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import app from "../app.js";
import { faker } from "@faker-js/faker";
import roles from "../helpers/roles.js";
import { User } from "../models/User.js";

let testAdminUser;
let testTokenAdmin;

describe('Get Users Registers Actions list', () => {
    beforeAll( async () => {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash("mypass.123", salt);
        
        testAdminUser = {
            id: faker.datatype.number(),
            username: faker.internet.userName(),
            password: hashPassword,
            role: roles.admin
        }

        testTokenAdmin = await jwt.sign({ id: testAdminUser.id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
    });

    test('should send a status code of 200 (get list users actions)',  async () => {
        jest.spyOn(User, 'findByPk').mockReturnValue(testAdminUser);
        const response =  await request(app).get('/userRegisters').send()
        .set('Authorization', 'Bearer '+testTokenAdmin)
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    })
})