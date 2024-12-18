import { User } from "../models/user.js ";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


export const login = async (req, res, next) => {  // Add 'next' here
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("Invalid Email or Password", 400)); // Pass 'next' to handle error

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400)); // Pass 'next' to handle error

        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error);  // Forward the error to the next middleware
    }
}



export const register = async (req, res, next) => {  // Add 'next' here
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("User already exists", 400)); // Pass 'next' to handle error
        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword });

        // Send cookie function from utils/features.js
        sendCookie(user, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);  // Forward the error to the next middleware
    }
}


export const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });
}

export const logout = async (req, res) => {

    res.status(200)
        .cookie('token', "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            success: true,
            user: req.user,
        });
}

