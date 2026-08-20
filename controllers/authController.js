import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/User.js";

// generate jwt token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// register user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill in all fields",
            });
        }

        // validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid email",
            });
        }

        // check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};