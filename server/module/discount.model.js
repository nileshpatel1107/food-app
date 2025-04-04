const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    discountId: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: ['flat', 'percentage'],
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    numberOfTimesApply: {
        type: Number,
        default: 1,
    },
    maxDiscount: {
        type: Number,
        default: function () {
            return this.type === 'percentage';
        },
    },
    couponCode: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
