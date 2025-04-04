const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem"
    }],
    dateOfOrder: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});


// Middleware to delete OrderItems when an Order is deleted
orderSchema.pre("findOneAndDelete", async function (next) {
    try {
        const order = await this.model.findOne(this.getFilter()); // Get the order being deleted
        if (order) {
            await mongoose.model("OrderItem").deleteMany({ orderId: order._id });
        }
        next();
    } catch (error) {
        next(error);
    }
});



const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
