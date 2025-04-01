const mongoose = require("mongoose");
const { Schema } = mongoose;

// Cart Schema
const cartSchema = new Schema({
    cartId: {
        type: Number,

        unique: true,  // Ensure it's unique
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming there is a User model to associate with the user
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
});


// Function to generate the next cartId by finding the max value and incrementing it
cartSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastCart = await this.constructor.findOne().sort('-cartId');
        this.cartId = lastCart ? lastCart.cartId + 1 : 1; // If no cartId exists, start from 1
    }
    next();
});


// Cart Model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
