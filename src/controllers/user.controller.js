import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import Roles from "../helpers/roles.js";

export const getUsers = async (req, res) => {
    try{
        const users = await User.findAll({
            attributes: {
                exclude: ['password'] // Removing password from User response data
              }
        });
        res.json(users);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    try{
        const { username, password, role } = req.body

        if(!username || !password || !role )
            return res.status(400).json( {message: "all input is required"} )
        
        if(!(role in Roles)){
            return res.status(400).json({message: "Error in role value"})
        }
        const user = await User.findOne({
            where: {
                username
            }
        })

        if(user) 
            return res.status(400).json({message: "Username already exist"})
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const newUser = await User.create({
            username,
            password: hashPassword,
            role
        })
        res.json(newUser);
    }catch ( error ) {
        return res.status(500).json({message: "Error Interno"})
    }
    
}

export const updateUser = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const deleteUser = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}