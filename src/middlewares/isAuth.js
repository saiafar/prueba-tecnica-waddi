import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const isAuth =  async (req, res, next) => {
    try {
        const token =  req.headers["authorization"];

        console.log("TOKENNNNNNN", token)
    
        if(typeof token === "undefined"){
            next();
        }
            

        const  verify = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findByPk(verify.id);
        if(user){
            req.userAuth = user;
        }   
        next();
    } catch (error){
        if (error instanceof jwt.JsonWebTokenError)
            return res.status(401).json({message:"Error invalid Token"})
        
        return res.status(403).json({message:"Internal Error"})
    }
}

export default isAuth;