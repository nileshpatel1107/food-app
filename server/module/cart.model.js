const mongoose = require("mongoose");
const { Schema } = mongoose;

// Cart Schema
const cartSchema = new Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true, // Auto-generate ObjectId for each cart item
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
    totalAmount: { type: Number, default: 0 },
    updatedOn: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    cartitems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartItem', // Referencing the CartItem schema
        },
    ],
});




// Cascade delete CartItems when Cart is deleted
cartSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    await mongoose.model("CartItem").deleteMany({ cartId: this._id });
    next();
});


// Cart Model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
