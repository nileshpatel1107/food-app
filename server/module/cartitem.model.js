const mongoose = require("mongoose");
const { Schema } = mongoose;

// CartItem Schema
const cartItemSchema = new Schema({
    cartItemId: {
        type: String,
        default: () => Math.floor(Math.random() * 1000000), // Generates a random 6-digit number
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
    amount: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, // Quantity should be at least 1
    },
    totalAmount: {
        type: Number,
        required: true,
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


// Function to generate the next cartId by finding the max value and incrementing it
// cartItemSchema.pre('save', async function (next) {
//     if (this.isNew) {
//         const lastCart = await this.constructor.findOne().sort('-cartItemId');
//         this.cartItemId = lastCart ? lastCart.cartId + 1 : 1; // If no cartId exists, start from 1
//     }
//     next();
// });
// CartItem Model
const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
