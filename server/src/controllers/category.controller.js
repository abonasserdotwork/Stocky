const mongoose = require("mongoose");
const Category = require("../models/category.model.js");

// Counts products per category. Returns zeros until the Product model exists.
const getProductCounts = async (ids) => {
  const Product = mongoose.models.Product;
  if (!Product) return new Map();
  
  const rows = await Product.aggregate([
    { $match: { category: { $in: ids } } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);
  return new Map(rows.map((r) => [String(r._id), r.count]));
};

const withCount = (category, counts) => ({
  ...category.toJSON(),
  products_count: counts.get(String(category._id)) ?? 0,
});

const sendDuplicate = (res) =>
  res.status(409).json({ success: false, message: "A category with this name already exists." });

const checkId = (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) return true;
  res.status(400).json({ success: false, message: "Invalid category id" });
  return false;
};

const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  const counts = await getProductCounts(categories.map((c) => c._id));
  return res.status(200).json({
    success: true,
    data: categories.map((c) => withCount(c, counts)),
  });
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description, createdBy: req.user._id });
    return res.status(201).json({
      success: true,
      message: "Category created",
      data: { ...category.toJSON(), products_count: 0 },
    });
  } catch (err) {
    if (err.code === 11000) return sendDuplicate(res);
    throw err;
  }
};

const updateCategory = async (req, res) => {
  if (!checkId(req, res)) return;
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    category.name = req.body.name;
    category.description = req.body.description ?? "";
    await category.save();

    const counts = await getProductCounts([category._id]);
    return res.status(200).json({
      success: true,
      message: "Category updated",
      data: withCount(category, counts),
    });
  } catch (err) {
    if (err.code === 11000) return sendDuplicate(res);
    throw err;
  }
};

const deleteCategory = async (req, res) => {
  if (!checkId(req, res)) return;
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ success: false, message: "Category not found" });
  }

  const counts = await getProductCounts([category._id]);
  const count = counts.get(String(category._id)) ?? 0;
  if (count > 0) {
    return res.status(409).json({
      success: false,
      message: `"${category.name}" has ${count} products. Move or delete them first.`,
    });
  }

  await category.deleteOne();
  return res.status(200).json({ success: true, message: "Category deleted" });
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };