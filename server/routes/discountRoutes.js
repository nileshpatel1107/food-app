const express = require('express');
const Discount = require('../module/discount.model');
const router = express.Router();

// Create a discount
router.post('/discounts', async (req, res) => {
    try {
        console.log(req.body);
        const discount = new Discount(req.body);
        await discount.save();
        res.status(201).json(discount);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

// Get all discounts
router.get('/discounts', async (req, res) => {
    try {
        const discounts = await Discount.find().populate('restaurantId createdBy');
        res.json(discounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a discount
router.put('/discounts/:id', async (req, res) => {
    try {
        const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!discount) return res.status(404).json({ message: "Discount not found" });
        res.json(discount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Soft delete a discount
router.delete('/discounts/:id', async (req, res) => {
    try {
        const discount = await Discount.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        console.log(discount);
        if (!discount) return res.status(404).json({ message: "Discount not found" });
        res.json({ message: "Discount deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
