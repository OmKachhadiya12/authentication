import jwt from "jsonwebtoken";

export const generateToken = async(userId) => {
    return await jwt.sign(userId,process.env.JWT_SECRET,{ expiresIn: process.env.EXPIRY_TOKEN});
};