const express = require("express");
const router = express.Router();
const Order = require("./../module/order.model");
const OrderItem = require("./../module/orderitem.model");

// Create an order grouped by restaurantId
router.post("/create", async (req, res) => {
    try {
        const { createdBy, address, paymentMethod, orderItems } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "Order must have at least one item." });
        }
        console.log("Order items:", orderItems.length);
        // Group items by restaurantId
        const ordersByRestaurant = {};
        orderItems.forEach(item => {
            if (!ordersByRestaurant[item.restaurantId]) {
                ordersByRestaurant[item.restaurantId] = [];
            }
            ordersByRestaurant[item.restaurantId].push(item);
        });

        const createdOrders = [];

        // Create an order for each restaurant
        for (const [restaurantId, items] of Object.entries(ordersByRestaurant)) {
            let totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

            const newOrder = new Order({
                createdBy,
                restaurantId,
                address,
                paymentMethod,
                totalAmount
            });

            const savedOrder = await newOrder.save();

            // Create OrderItems and link them to the order
            const orderItemPromises = items.map(async (item) => {
                const newOrderItem = new OrderItem({
                    orderId: savedOrder._id,
                    restaurantId: item.restaurantId,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                });
                return newOrderItem.save();
            });

            const orderItemsDocs = await Promise.all(orderItemPromises);

            // Update order with created order items
            savedOrder.orderItems = orderItemsDocs.map(item => item._id);
            await savedOrder.save();

            createdOrders.push(savedOrder);
        }

        res.status(201).json({ message: "Orders created successfully", orders: createdOrders });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});


// Get all orders by userId
router.get("/", async (req, res) => {
    try {
        const userId = req.query.userId;
        const orders = await Order.find({ userId: userId });

      const ordersWithItems = await Promise.all(orders.map(async (order) => {
        const orderItems = await OrderItem.find ({ orderId: order._id });
        order.orderItems = orderItems;
        return order;
      }));  

        res.status(200).json(ordersWithItems);
        
    } catch (error) {
        console.error("Error getting orders:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
})

//  delete order by orderId
router.delete("/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
})
module.exports = router;
