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