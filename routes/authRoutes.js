import express from "express";

import auth from "../middleware/auth.js";

import { register, login } from "../controllers/authController.js";

const router = express.Router();

// public routes
router.post("/register", register);
router.post("/login", login);

// protected routes
router.get("/profile", auth, (req, res) => {
    res.json({
        message: "Profile",
        user: req.user,
    });
});

export default router;