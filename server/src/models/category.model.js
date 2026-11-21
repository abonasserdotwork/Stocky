const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      minlength: [2, "Category name must be at least 2 characters"],
      maxlength: [60, "Category name must be at most 60 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [250, "Description must be at most 250 characters"],
      default: "",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString(); // the frontend uses `id`
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// "Dairy" and "dairy" count as the same name
categorySchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

module.exports = mongoose.model("Category", categorySchema);