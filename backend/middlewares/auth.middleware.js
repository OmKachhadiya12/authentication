import jwt from "jsonwebtoken";
import {User} from "./../models/user.model.js";

export const isAuthenticated = async(req,res,next) => {
    const token = res.cookie?.token;

    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }

    try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();

    }catch(error){
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }   
};