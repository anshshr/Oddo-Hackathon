const express = require("express");
const router = express.Router();
const UserDetail = require("../models/usermodel");
const authMiddleware = require("../middleware");

// ✅ CREATE user detail
router.post("/create",authMiddleware, async (req, res) => {
  try {
    const { fullName, profilePhoto, bio, address, phoneNumber, gender, dateOfBirth } = req.body;
    const userId = req.user.userId; // from auth middleware

    // Check if already exists
    const existing = await UserDetail.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: "User detail already exists" });
    }

    const newDetail = new UserDetail({
      userId,
      fullName,
      profilePhoto,
      bio,
      address,
      phoneNumber,
      gender,
      dateOfBirth
    });

    await newDetail.save();
    res.status(201).json({ message: "User detail created successfully", detail: newDetail });

  } catch (err) {
    res.status(500).json({ message: "Error creating user detail", error: err.message });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    console.log("Fetching user detail for userId:", req.user.userId);
    const userId = req.user.userId; // from JWT middleware
  
    const userDetail = await UserDetail.findOne({ userId });
    console.log("User detail found:", userDetail);
    if (!userDetail) {
      return res.status(404).json({ message: "User detail not found" });
      console.log("User detail not found for userId:", userId);
    }

    console.log("User detail fetched successfully for userId:", userId);
    res.status(200).json({ userDetail });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user detail", error: error.message });
  }
});


// ✏️ UPDATE user detail
router.put("/update/:id", async (req, res) => {
  try {
    const detailId = req.params.id;
    const updates = req.body;
    const userId = req.user.userId; // from auth middleware

    const existing = await UserDetail.findById(detailId);
    if (!existing) {
      return res.status(404).json({ message: "User detail not found" });
    }

    if (existing.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this profile" });
    }

    const updated = await UserDetail.findByIdAndUpdate(detailId, updates, { new: true });
    res.status(200).json({ message: "User detail updated successfully", detail: updated });

  } catch (err) {
    res.status(500).json({ message: "Error updating user detail", error: err.message });
  }
});



router.get("/allusers", async (req, res) => {
  try {
  
    const users = await UserDetail.find().sort({ createdAt: -1 });
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
   
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

module.exports = router;
