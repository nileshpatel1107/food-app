const express = require("express");
const Cart = require("../module/cart.model");
const RestaurantMenu = require("../module/restaurantmenu.model");
const CartItem = require("../module/cartitem.model");
const router = express.Router();

router.post('/addcart', async (req, res) => {
    const { userId } = req.body;
    console.log("User ID:", userId);
    try {
        const newCart = new Cart({
            userId,
            // other fields can be passed here like createdOn, etc.
        });

        

        await newCart.save();


        //add item in also carditem

        res.status(200).json({ message: "Cart created successfully", cart: newCart });
    } catch (error) {
        console.error("Error creating cart:", error);
        res.status(500).json({ message: "Failed to create cart" });
    }
});



// Add Cart Item to Cart
router.post('/:cartId/item', async (req, res) => {
    const { menuId, amount, quantity, createdBy } = req.body;
    const { cartId } = req.params;

    console.log("Cart ID:", cartId);
    console.log("Menu ID:", menuId);
    try {
        // Check if the cart exists
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found!" });
        }

        // Find the menu item
        const menuItem = await RestaurantMenu.findById(menuId);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found!" });
        }

        // Calculate total amount for this cart item
        const totalAmount = amount * quantity;

        // Create the new CartItem
        const newCartItem = new CartItem({
            cartId,
            menuId,
            amount,
            quantity,
            totalAmount,
            createdBy,
        });

        // Save the CartItem
        await newCartItem.save();

        res.status(200).json({ message: "Cart item added successfully!", cartItem: newCartItem });
    } catch (error) {
        console.error("Error adding cart item:", error);
        res.status(500).json({ message: "Failed to add cart item" });
    }
});




module.exports = router;