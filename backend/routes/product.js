const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// ✅ Create Product
router.post("/create", async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      size,
      condition,
      tags,
      images,
      swapOption,
      pointsRequired
    } = req.body;

    const { userId, name, profilePic } = req.user; // from middleware

    const newProduct = new Product({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags,
      images,
      swapOption,
      pointsRequired: swapOption === "points" ? pointsRequired : 0,
      ownerId: userId,
      ownerName: name,
      ownerImage: profilePic
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });

  } catch (err) {
    res.status(500).json({ message: "Failed to create product", error: err.message });
  }
});

// 🗑️ Delete Product by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.ownerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized: Only the owner can delete" });
    }

    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
});

// ✏️ Update Product by ID
router.put("/update/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.ownerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized: Only the owner can update" });
    }

    const updates = req.body;
    if (updates.swapOption === "swap") updates.pointsRequired = 0;

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });

  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
});

module.exports = router;
