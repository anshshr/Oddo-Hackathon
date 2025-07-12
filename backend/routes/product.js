const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const authMiddleware = require("../middleware");

// ✅ Create Product
router.post("/create",authMiddleware, async (req, res) => {
  try {
    const {
        name,
        profilePic,
      title,
      description,
      category,
      type,
      size,
     
      images,
      swapOption,
      pointsRequired
    } = req.body;

    const { userId } = req.user; // from middleware
    console.log("Creating product for userId:", userId , "name:", name, "profilePic:", profilePic);

    const newProduct = new Product({
      title,
      description,
      category,
      type,
      size,
     
     
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


    const updates = req.body;
    if (updates.swapOption === "swap") updates.pointsRequired = 0;

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });

  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
});




;


// ✅ Get all products by logged-in owner
router.get("/owner",authMiddleware, async (req, res) => {
  try {
    const ownerId = req.user.userId;

    const products = await Product.find({ ownerId }).sort({ createdAt: -1 });
    res.status(200).json({ products });

  } catch (err) {
    res.status(500).json({ message: "Error fetching owner products", error: err.message });
  }
});


// 🔄 Get all products swapped by logged-in user
router.get("/swapped",authMiddleware, async (req, res) => {
  try {
    const swappedId = req.user.userId;

    const swappedProducts = await Product.find({ swappedId }).sort({ updatedAt: -1 });
    res.status(200).json({ products: swappedProducts });

  } catch (err) {
    res.status(500).json({ message: "Error fetching swapped products", error: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
  
    const products = await Product.find().sort({ createdAt: -1 });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
   
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

router.get("/finddes/:id", async (req, res) => {
  try {
      console.log("productId");
    const productId = req.params.id ;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
});



module.exports = router;
