import { Op } from "sequelize";
import { sequelize } from "../database/database.js";
import actions from "../helpers/actions.js";
import { Post } from "../models/Post.js";
import { createUserRegister } from "./userRegister.controller.js";

export const getPosts = async (req, res) => {
    try {
        let where = [];
        const { date, from, to } =  req.query;

        date ? where.push(sequelize.where(sequelize.fn('DATE', sequelize.col('createdAt')), date)):null;
        from ? where.push(sequelize.where(sequelize.fn('DATE', sequelize.col('createdAt')), {[Op.gte]: from})):null;
        to ? where.push(sequelize.where(sequelize.fn('DATE', sequelize.col('createdAt')), {[Op.lte]: to})):null;

        const posts = await Post.findAll({ attributes: [
                'id',
                'title',
                'body',
                'createdAt',
                'userId'
            ], 
            where,
            order: [['createdAt', 'DESC']]
        });
        res.json(posts);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        res.json(post);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    try {
        const { title, body } = req.body

        const newPost = await Post.create({
            title,
            body,
            userId: req.userAuth.id,
            published: true
        })
        await createUserRegister(req, res, newPost.id, actions.create);
        res.json(newPost);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }   
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;

        if ( !title || !body )
            return res.status(400).json({message: "all input is required"})

        const post = await Post.findByPk(id);
        if(!post)
            return res.status(404).json( {message: "post not found"} )
        post.title = title;
        post.body = body;
        await post.save();
        createUserRegister(req, res, post.id, actions.update);
        res.json(post);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deletePost = async ( req, res) => {
    try {
        const { id } = req.params;
        await Post.destroy({
            where: {
                id, 
            },
        });
        setUserRegister(req.userAuth.id, newPost.id, actions.create);
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}