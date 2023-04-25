import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../models/User.js";
import roles from "../helpers/roles.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if(!username || !password)
            return res.status(400).json({message: "All input is required"});    

        const user = await User.findOne({
            where: {
                username
            }
        });
        
        if(!user)
            return res.status(400).json({message:"Wrong credentials"});

        const isPassMatched = await bcrypt.compare(password, user.password);
        
        if(!isPassMatched)
            return res.status(400).json({message:"Wrong credential pass"});
        
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        res.status(200).json({
            username: user.username,
            token: token
        });
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const register = async (req, res) => {
    try{
        const { username, password, role } = req.body

        if(!username || !password || !role )
            return res.status(400).json( {message: "all input is required"} );
        
        if(!(role in roles)){
            return res.status(400).json({message: "Error in role value"});
        }
        const user = await User.findOne({
            where: {
                username
            }
        })

        if(user) 
            return res.status(400).json({message: "Username already exist"});
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const newUser = await User.create({
            username,
            password: hashPassword,
            role
        })
        res.json(newUser);
    }catch ( error ) {
        return res.status(500).json({message: error.message})
    }
    
}