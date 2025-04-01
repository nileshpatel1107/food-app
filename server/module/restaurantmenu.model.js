const mongoose = require("mongoose");

const restaurantMenuSchema = new mongoose.Schema(
    {
        menuID: {
            type: Number,
            unique: true,
            default: () => Math.floor(Math.random() * 1000000), // Generates a random 6-digit number
        },
        restaurantID: {
            type: mongoose.Schema.Types.ObjectId,  // Use ObjectId to reference the restaurant
            ref: "Restaurant",                     // Reference to the Restaurant model
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            min: 0,
        },
        image: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            enum: ["Appetizer", "Main Course", "Dessert", "Beverage"],
        },
        availability: {
            type: Boolean,
            default: true,
        },
        quantity: {
            type: Number,
            default: 0,  // ✅ Added quantity with default value of 0
            min: 0,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const RestaurantMenu = mongoose.model("RestaurantMenu", restaurantMenuSchema);

module.exports = RestaurantMenu;
