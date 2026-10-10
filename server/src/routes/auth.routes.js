const express = require("express");
const router = express.Router();
const { registerUser, loginUser, refreshUser, logoutUser, getCurrentUser } = require("../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../validators/auth.validator.js");
const { protect, adminOnly } = require("../middlewares/auth.middleware.js");




router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);
router.post("/refresh", refreshUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getCurrentUser);
router.get("/meAdmin", protect, adminOnly, getCurrentUser);


module.exports = router;