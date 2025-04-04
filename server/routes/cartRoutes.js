const express = require("express");
const RestaurantMenu = require("../module/restaurantmenu.model");
const Cart = require("../module/cart.model");
const CartItem = require("../module/cartitem.model");
const router = express.Router();
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
//get all item in cart by userid
router.get('/getcart/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const cartItems = await CartItem.find({ cartId: cart._id });

        if (!cartItems || cartItems.length === 0) {
            cart.cartitems = []; // Ensure cartItems is an empty array if no items found
        }
        cart.cartitems = cartItems;
        res.json(cart);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

})


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


// Create a new cart with dummy data
router.post("/create", async (req, res) => {
    try {
        // Step 1: Create a new Cart
        const newCart = new Cart({
            userId: "67db80a5c58bdee5968bf217", // Dummy User ID

            cartItems: [],
        });

        await newCart.save();

        // Step 2: Create dummy CartItems
        // const dummyItems = [
        //     { menuId: "67ecf828bcbfbd4c11b09f85", quantity: 2, amount: 25, createdBy: "67db80a5c58bdee5968bf217", restaurantId: "67def69d367a457fd2939632" }, // Dummy Menu Item 1
        //     { menuId: "67ecf841bcbfbd4c11b09f87", quantity: 1, amount: 200, createdBy: "67db80a5c58bdee5968bf217", restaurantId: "67def69d367a457fd2939632" }, // Dummy Menu Item 2
        // ];

        // let totalAmount = 0;
        // const cartItems = [];

        // for (const item of dummyItems) {
        //     const newItem = new CartItem({
        //         cartId: newCart._id,
        //         menuId: item.menuId,
        //         quantity: item.quantity,
        //         price: item.price,
        //         createdBy: item.createdBy,
        //         restaurantId: item.restaurantId,
        //         createdOn: new Date(),
        //         amount: item.amount
        //     });
        //     await newItem.save();
        //     totalAmount += item.quantity * item.amount;
        //     cartItems.push(newItem._id);
        // }

        // // Step 3: Update the Cart with totalAmount and related CartItems
        // newCart.totalAmount = totalAmount;
        // newCart.cartitems = cartItems;
        // await newCart.save();

        res.status(201).json({ message: "New cart created successfully", cart: newCart });
    } catch (error) {
        res.status(500).json({ message: "Error creating cart", error });
    }
});


//delete cart by cartId
router.delete("/:cartId", async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        await cart.deleteOne(); // Triggers the `pre("deleteOne")` middleware

        res.json({ message: "Cart and related items deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting cart", error });
    }
});


router.post("/addcartItem/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { menuId, restaurantId, amount, quantity, createdBy } = req.body;
        console.log("User ID:", userId);
        console.log("Menu ID:", menuId);
        console.log("Restaurant ID:", restaurantId);
        console.log("Amount:", amount);
        console.log("Quantity:", quantity);
        console.log("Created By:", createdBy);

        // Validate userId
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        // Find existing cart
        let cart = await Cart.findOne({ userId });
        console.log("Existing Cart:", cart);
        // If cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({
                userId,
                cartitems: [],
                totalAmount: 0
            });
            await cart.save();
        }

        // Create a new cart item
        const cartItem = new CartItem({
            cartId: cart._id,
            menuId,
            restaurantId,
            amount,
            quantity,
            totalAmount: amount * quantity, // Calculate total for the item
            createdBy
        });

        // Save cart item
        await cartItem.save();

        // Update cart by adding the new cart item
        cart.cartitems.push(cartItem._id);

        // Recalculate cart total amount
        const cartItems = await CartItem.find({ cartId: cart._id });
        cart.totalAmount = cartItems.reduce((sum, item) => sum + item.totalAmount, 0);

        await cart.save();

        res.status(201).json({ message: "Item added to cart successfully", cart });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ message: "Error adding item to cart", error: error.message });
    }
});


//by user user id only change quantity
router.put("/:menuId", async (req, res) => {
    try {
        const { menuId } = req.params;
        const { quantity,amount } = req.body;
       
        const cartItem = await CartItem.findOne({ menuId });
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        cartItem.quantity = quantity;
        cartItem.amount = amount;
        cartItem.totalAmount = amount * quantity;
        await cartItem.save();

        res.json({ message: "Cart item quantity updated successfully", cartItem });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart item quantity", error });
    }
});

module.exports = router;