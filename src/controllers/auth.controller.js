import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../models/User.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if(!username || !password)
            return res.status(400).json({message: "All input is required"});    

        const user = await User.findOne({
            where: {
                username
            }
        })
        
        if(!user)
            return res.status(400).json({message:"Wrong credentials"});

        const isPassMatched = await bcrypt.compare(password, user.password);
        
        if(!isPassMatched)
            return res.status(400).json({message:"Wrong credential pass"});
        
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        }) 
        user.token = token;
        res.status(200).json(token);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}