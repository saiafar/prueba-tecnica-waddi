import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const auth =  async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if(!token)
            return res.status(403).json({message: "Access denied"})

        const  verify = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findByPk(verify.id,
            {
                attributes: {
                    exclude: ['password']
                  }
            });
        if(!user){
            return res.status(403).json({message:"Access denied"})
        }   
        req.userAuth = user;
        next();
    } catch (error){
        if (err instanceof jwt.JsonWebTokenError)
            return res.status(401).json({message:"Error invalid Token"})
        return res.status(403).json({message:"Access denied"})
    }
}

export default auth;