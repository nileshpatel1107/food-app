const express = require("express");
const router = express.Router();
const Restaurant = require("../module/restorent.model")
const upload = require("../middleware/multer.middleware");
const cloudinary = require("../utils/cloudinary")

// Get All Restaurants
router.get("/restaurants", async (req, res) => {
    try {
        console.log("Fetching all restaurants...");
        const restaurants = await Restaurant.find();
        console.log("Restaurants fetched successfully", restaurants.length);
        return res.status(200).json(restaurants);
    } catch (error) {
        console.error("Error fetching restaurants:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
});



// Add Restaurant
router.post("/addrestaurant", upload.single("image"), async (req, res) => {
    try {
        console.log("Entering restaurant registration...");
        const { name, ownerName, location, cuisine, rating, priceRange, contactNumber, openingHours, isOpen } = req.body;
        console.log(name)

        // Check if the restaurant already exists
        const existingRestaurant = await Restaurant.findOne({ name, location });
        console.log(existingRestaurant)
        if (existingRestaurant) {
            console.log("Restaurant already exists");
            return res.status(400).json({ message: "Restaurant already exists" });
        }
        console.log(req.file)


        // Create a new restaurant
        // const newRestaurant = new Restaurant({
        //     name,
        //     ownerName,
        //     location,
        //     cuisine,
        //     rating,
        //     priceRange,
        //     contactNumber,
        //     openingHours,
        //     isOpen,
        //     image: req.file.path,
        // });

        const newRestaurant = new Restaurant({
            ...req.body,
            image: req.file.path, // Cloudinary URL
        });
        console.log(newRestaurant)
        await newRestaurant.save();
        console.log("Restaurant added successfully");
        return res.status(201).json({ message: "Restaurant added successfully" });

    } catch (error) {
        console.error("Error adding restaurant:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
});


//restorent details by id
router.get("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        console.log("Fetching restaurant details...");
        console.log(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        return res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error getting restaurant:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
})
module.exports = router;
