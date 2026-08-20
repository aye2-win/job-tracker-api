import jwt from "jsonwebtoken";

// get token and verify user
const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({
            message: "No token, access denied",
        });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};

export default auth;