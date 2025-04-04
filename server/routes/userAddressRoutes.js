const express = require('express');
const router = express.Router();
const UserAddress = require('../module/useraddress.model');

// Create a new address
router.post('/', async (req, res) => {
  try {
    const { userId, address, city, state, country } = req.body;

    // Validate required fields
    if (!userId || !address || !city || !state || !country) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAddress = new UserAddress({
      userId,
      address,
      city,
      state,
      country,
    });

    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: 'Error creating address', error: error.message });
  }
});

// Get all addresses for a user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const addresses = await UserAddress.find({ userId }).populate('userId');
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving addresses', error: error.message });
  }
});

// Update an address
router.put('/:addressId', async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const { address, city, state, country } = req.body;

    const updatedAddress = await UserAddress.findByIdAndUpdate(
      addressId,
      { address, city, state, country },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: 'Error updating address', error: error.message });
  }
});

module.exports = router;