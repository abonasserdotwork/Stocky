const express = require("express");
const router = express.Router();
const {
  getCategories, createCategory, updateCategory, deleteCategory,
} = require("../controllers/category.controller.js");
const { categoryValidator } = require("../validators/category.validator.js");
const { validate } = require("../middlewares/validate.middleware.js");
const { protect } = require("../middlewares/auth.middleware.js");

router.use(protect); // contract: Categories = any logged-in user

router.get("/", getCategories);
router.post("/", categoryValidator, validate, createCategory);
router.put("/:id", categoryValidator, validate, updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;