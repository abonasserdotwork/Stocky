const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = result.array().map((e) => ({ field: e.path, message: e.msg }));
  // "message" is the first error, so the frontend's getErrorMessage works unchanged
  return res.status(400).json({ success: false, message: errors[0].message, errors });
};

module.exports = { validate };