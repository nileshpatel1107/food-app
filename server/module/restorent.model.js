const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        ownerName: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        cuisine: {
            type: String,
            required: true,
            trim: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        priceRange: {
            type: String,
            enum: ["₹", "₹₹", "₹₹₹", "₹₹₹₹"],
            default: "₹₹",
        },
        contactNumber: {
            type: String,
            required: true,
            trim: true,
        },
        openingHours: {
            type: String,
            required: true,
            trim: true,
        },
        isOpen: {
            type: Boolean,
            default: true,
        },
        image: {
            type: String, // URL of the image
            required: false, // Not mandatory
            default: "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder image
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);



const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
