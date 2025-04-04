const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {

        type: String,
        required: true
    }
});

UserAddress= mongoose.model('UserAddress', userAddressSchema);
module.exports = UserAddress;
