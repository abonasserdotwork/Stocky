const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const protect = async (req, res, next) => {
    const reqHeaders = req.headers.authorization;

    if (!reqHeaders || !reqHeaders.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authorization header missing or invalid",
        });
    }

    const token = reqHeaders.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token is required",
        });
    }

    let decoded;

    try {
        decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token",
        });
    }

    try {
        const user = await User.findById(decoded.id)
            .select("-refreshTokens");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists",
            });
        }

        req.user = user;
        return next();
    } catch (err) {
        console.error("Middleware Error:", err.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const adminOnly = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "You need to login first.",
        });
    }

    if (!req.user.isAdmin) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized access.",
        });
    }

    return next();
};

module.exports = {
    protect,
    adminOnly,
};
