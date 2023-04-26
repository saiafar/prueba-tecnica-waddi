import request from "supertest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import {expect, jest, test} from '@jest/globals';
import app from "../app.js";
import { User } from "../models/User.js";
import roles from "../helpers/roles.js";
import { Post } from "../models/Post.js";
import { UserRegister } from "../models/UserRegister.js";

let testUser;
let testToken;

describe('POSTS', () => {
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

    describe('Get post list', () => {
        test('get all posts',  async () => {
            const response =  await request(app).get('/posts').send()
            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
        })
    })

    describe('Create New Post', () => {
        test('should send a status code of 200 (create post success!!)',  async () => {
            jest.spyOn(Post, 'create').mockReturnValue({title:"Hello World", body:"My body Post"});
            jest.spyOn(User, 'findByPk').mockReturnValue(testUser);
            jest.spyOn(UserRegister, 'create').mockReturnValue(true);
            const response =  await request(app).get('/posts').send({
                title:"Hello World",
                body:"My body Post"
            })
            .set('Authorization', 'Bearer '+testToken);
            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
        })

        test('should send a status code of 401 when user no authorized',  async () => {
            jest.spyOn(User, 'findByPk').mockReturnValue({
                id: testUser.id,
                role: roles.editor
            });
            const response =  await request(app).post('/posts').send({
                title:"Hello World",
                body:"My body Post"
            })
            .set('Authorization', 'Bearer '+testToken);
            expect(response.status).toBe(401);
        });

        test('should send a status code of 200 when update post',  async () => {
            jest.spyOn(User, 'findByPk').mockReturnValue({
                id: testUser.id,
                role: roles.editor
            });
            jest.spyOn(Post, 'findByPk').mockReturnValue({
                id: 1,
                title: "lorem ipsum",
                body: "lorem ipsum",
                save:() => {return true}
            });

            const response =  await request(app).put('/posts/1').send({
                title:"Hello World",
                body:"My body Post"
            })
            .set('Authorization', 'Bearer '+testToken);
            expect(response.status).toBe(200);
        });
    })

})