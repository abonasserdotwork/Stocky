const User = require("../models/user.model.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const saveRefreshToken = async (refreshToken, user) => {
    user.refreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");
    await user.save();
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Please provide name, email and password" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json({ success: true, message: "User registered successfully", user });
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const token = user.generateToken();
    const refreshToken = user.generateRefreshToken();
    await saveRefreshToken(refreshToken, user);


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/auth",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        success: true, message: "User logged in successfully", accessToken: token, user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        }
    });
}

const refreshUser = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed",
            });
        }

        let decoded;

        try {
            decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );
        } catch (err) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/api/auth",
            });

            return res.status(401).json({
                success: false,
                message: "Invalid or expired refresh token",
            });
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        const user = await User.findOne({
            _id: decoded.id,
            refreshToken: hashedToken,
        });

        if (!user) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/api/auth",
            });

            return res.status(401).json({
                success: false,
                message: "Session is no longer valid",
            });
        }

        const accessToken = user.generateToken();
        const newRefreshToken = user.generateRefreshToken();
        await saveRefreshToken(newRefreshToken, user);

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/api/auth",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });


        return res.status(200).json({
            success: true,
            accessToken,
        });
    } catch (err) {
        console.error("Refresh Controller Error:", err);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const logoutUser = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/auth",
    };

    if (!refreshToken) {
        res.clearCookie("refreshToken", cookieOptions);

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }

    try {
        const hashedToken = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        const currentUser = await User.findOne({
            refreshToken: hashedToken,
        });

        if (currentUser) {
            currentUser.refreshToken = null;
            await currentUser.save();
        }

        res.clearCookie("refreshToken", cookieOptions);

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to log out",
        });
    }
};

const getCurrentUser = async (req, res) => {
    if (!req.user) return res.status(400).json({ success: false, message: "you need to login" });

    return res.status(200).json({
        success: true,
        user: {
            name: req.user.name,
            isAdmin: req.user.isAdmin,
        }
    })
}


module.exports = {
    registerUser,
    loginUser,
    refreshUser,
    logoutUser,
    getCurrentUser,
}