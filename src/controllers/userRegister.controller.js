import { sequelize } from "../database/database.js";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
import { UserRegister } from "../models/UserRegister.js";



export const createUserRegister = async (req, res, postId, action) =>{
    try {
        await UserRegister.create({
            userId: req.userAuth.id,
            action,
            postId
        });    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Error"})
    }
}

export const userRegisters = async (req, res) =>{
    try {
    
        const uRegisters = await UserRegister.findAll({
            attributes: ['userId', 'action', 'postId']
        });

        return res.send(uRegisters);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Error"})
    }
    
};