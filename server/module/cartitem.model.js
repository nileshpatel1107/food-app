const mongoose = require("mongoose");
const { Schema } = mongoose;

// CartItem Schema
const cartItemSchema = new Schema({
    cartItemId: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true, // Auto-generate ObjectId for each cart item
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart', // Referencing the Cart schema
        required: true,
    },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestaurantMenu', // Referencing the RestaurantMenu schema
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant', // Referencing the Restaurant schema
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, // Quantity should be at least 1
    },
    amount: {
        type: Number,
       min: 0, // Amount should be non-negative
    },
    
    totalAmount: {
        type: Number,
      default: 0,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    updatedOn: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming there is a User model to associate with the creator of the cart item
        required: true,
    },
});


const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
