const express = require("express");
const router = express.Router();
const RestaurantMenu = require("../module/restaurantmenu.model");
const upload = require("../middleware/multer.middleware");
const cloudinary = require("../utils/cloudinary")
const mongoose = require("mongoose");

// Route to upload image and save menu item
router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "Image upload failed" });
        }

        // Save the image URL from Cloudinary in the database
        const newMenuItem = new RestaurantMenu({
            ...req.body,
            image: req.file.path, // Cloudinary URL
        });
        console.log(newMenuItem)

        const savedItem = await newMenuItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error("Error saving menu:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// 📄 Get all menu items by Restaurant ID
router.get("/:restaurantId", async (req, res) => {
    try {
        const { restaurantId } = req.params;

        // Convert the restaurantId to a MongoDB ObjectId if necessary
        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ message: "Invalid restaurant ID" });
        }
        const restaurantObjectId = new mongoose.Types.ObjectId(restaurantId); // Use `new` keyword here

        // Fetch menu items where RestaurantID matches the provided restaurantId
        const menuItems = await RestaurantMenu.find({ restaurantID: restaurantObjectId });

        if (menuItems.length === 0) {
            return res.status(404).json({ message: "No menu items found for this restaurant" });
        }

        res.status(200).json(menuItems);
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ error: error.message });
    }
});

// 🔍 Get a single menu item by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from URL parameters
        console.log("Request ID:", id);

        // Find the menu item by ID
        const menuItem = await RestaurantMenu.find({ _id: id });

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json(menuItem);
    } catch (error) {
        console.error("Error fetching menu item:", error);
        res.status(500).json({ error: error.message });
    }
});



// ✏️ Update a menu item
router.put("/:id", async (req, res) => {
    try {
        const updatedItem = await RestaurantMenu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedItem) return res.status(404).json({ message: "Menu item not found" });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ❌ Delete a menu item
router.delete("/:id", async (req, res) => {
    try {
        const deletedItem = await RestaurantMenu.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: "Menu item not found" });
        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
