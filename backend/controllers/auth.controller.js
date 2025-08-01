import express from "express";
import  {User} from "./../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign(userId,process.env.JWT_SECRET,{ expiresIn: process.env.EXPIRY_TOKEN});
};

const registerRoute = async(req,res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
        }

        const newUser = await User.create({ fullName, email, password });

        res.status(201).json({
        message: "User registered successfully. Please log in.",
        user: {
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
        },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginRoute = async(req,res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });

  } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {registerRoute,loginRoute};