const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ success: true, order });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json({ orders });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});
module.exports = router;