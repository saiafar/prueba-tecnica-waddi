import request from "supertest";
import {jest} from '@jest/globals';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import app from "../app.js";
import { Review } from "../models/Review.js";
import { faker } from "@faker-js/faker";
import { Post } from "../models/Post.js";
import roles from "../helpers/roles.js";
import { User } from "../models/User.js";

let testUser;
let testToken;

describe('REVIEWS', () => {
    beforeAll( async () => {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash("mypass.123", salt);
        testUser = {
            id: faker.datatype.number(),
            username: faker.internet.userName(),
            password: hashPassword,
            role: roles.writer
        }
        testToken = await jwt.sign({ id: testUser.id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
    });

    describe('Get Reviews list', () => {
        test('should send a status code of 200 (list reviews)',  async () => {
            jest.spyOn(Review, 'findAll').mockReturnValue([
                {id: 1, value: 4},
                {id: 2, value: 4}
            ]);
            const response =  await request(app).get('/posts/1/reviews').send()
            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
        })
    })
    

    describe('Create Reviews', () => {
        test('should send a status code of 200 (no registered user create reviews)', async () => {
            jest.spyOn(Post, 'findByPk').mockReturnValue({
                id: 1,
                title: "lorem ipsum",
                body: "lorem ipsum",
                save:() => {return true}
            });

            jest.spyOn(Review, 'create').mockReturnValue({
                id: 1,
                value: 4,
            });

            const response =  await request(app).post('/posts/1/reviews').send({
                value: 4,
                guestName: faker.internet.userName()
            })
            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
        });
        
        test('should send a status code of 200 (registered user create reviews)', async () => {
            jest.spyOn(User, 'findByPk').mockReturnValue(testUser);
            const response =  await request(app).post('/posts/1/reviews').send({
                value: 4,
                guestName: faker.internet.userName()
            })
            .set('Authorization', 'Bearer '+testToken);
            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
        });
        
    })
})