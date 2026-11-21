const { body } = require("express-validator");

const categoryValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("Category name is required")
    .isLength({ min: 2, max: 60 }).withMessage("Category name must be 2 to 60 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 250 }).withMessage("Description must be at most 250 characters"),
];

module.exports = { categoryValidator };