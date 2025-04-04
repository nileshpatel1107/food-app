import React, { useState, useEffect } from "react";
import {
    Grid, Card, CardContent, CardMedia, Typography, Button, Box, IconButton, Chip, Modal
} from "@mui/material";
import { Add, Remove, ShoppingCart, LocalAtm, CheckCircle, Cancel, Close, Fastfood } from "@mui/icons-material";
import axios from "axios";

const MenuTab = ({  restaurantId }) => {
    const [cartitems, setCartItems] = useState([] ); // Ensure cartitems is always an array

    const [menu, setMenu] = useState([]);
  

    const [selectedItem, setSelectedItem] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const userId = "67db80a5c58bdee5968bf217"; // Replace with actual user ID

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
    };
    // ✅ Fetch Menu Items
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/restaurantmenu/${restaurantId}`);
                setMenu(response.data);
                console.log("Menu fetched successfully", response.data);
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };

        fetchMenu ();
    }, [restaurantId]);


    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/cart/getcart/${userId}`);
                setCartItems(response.data.cartitems);
                console.log("Cart items fetched successfully", response.data.cartitems);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [userId]);


  

    // ✅ Modal for Viewing Item Details
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedItem(null);
    };

    const handleAddToCart = async (item) => {
        if (!cartitems) return; // Prevent errors

        const existingCartItem = cartitems.find((cartItem) => cartItem.menuId === item._id);
        const newQuantity = existingCartItem ? existingCartItem.quantity + 1 : 1;

        try {
            await axios.post(`http://localhost:5001/cart/addcart/${userId}`, {
                cartitems: {
                    restaurantID: item.restaurantID,
                    menuId: item._id,
                    quantity: 1,
                    amount: item.price,
                    createdBy: userId,
                    cartId: "67ed262bdde98976aee00792",
                },
                userId: userId,
            });

            setCartItems((prevItems) => {
                const updatedItems = prevItems.map((cartItem) =>
                    cartItem.menuId === item._id ? { ...cartItem, quantity: newQuantity } : cartItem
                );

                if (!existingCartItem) {
                    updatedItems.push({ menuId: item._id, quantity: newQuantity });
                }

                return updatedItems;
            });

        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    const updateQuantity = async (menuId, quantity,price) => {
        if (quantity < 0) return;

        try {
            await axios.put(`http://localhost:5001/cart/${menuId}`, { quantity: quantity,amount: price });

            setCartItems((prevItems) =>
                prevItems.map((cartItem) =>
                    cartItem.menuId === menuId ? { ...cartItem, quantity: quantity } : cartItem
                )
            );
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    
    const updatedMenu = menu.map((item) => {
        const cartItem = cartitems?.find((cart) => cart.menuId === item._id);
        return { ...item, quantity: cartItem ? cartItem.quantity : 0 };
    });
    return (
        <Grid container spacing={2} justifyContent="center">
            {updatedMenu.length > 0 ? (
                updatedMenu.map((item) => (

                    <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ width: 350, height: 420, display: "flex", flexDirection: "column", borderRadius: 3, boxShadow: 4, transition: "transform 0.3s ease-in-out", "&:hover": { transform: "scale(1.03)" } }}>
                            <CardMedia component="img" height="200" image={item.image || "https://via.placeholder.com/150"} alt={item.name} sx={{ objectFit: "cover", borderRadius: "4px 4px 0 0" }} />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>{item.name}</Typography>

                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                    <Chip icon={<LocalAtm />} label={`₹${item.price}`} color="success" size="small" />
                                    {item.availability ? (
                                        <Chip label="Available" color="primary" icon={<CheckCircle />} size="small" />
                                    ) : (
                                        <Chip label="Not Available" color="error" icon={<Cancel />} size="small" />
                                    )}
                                </Box>

                                <Button variant="outlined" fullWidth sx={{ mt: 1 }} onClick={() => handleOpenModal(item)}>
                                    View Details
                                </Button>

                                {item.quantity === 0 ? (
                                    <Button variant="contained" fullWidth sx={{ mt: 1, bgcolor: "#ff5722", "&:hover": { bgcolor: "#e64a19" } }} onClick={() => handleAddToCart(item)} startIcon={<ShoppingCart />}>
                                        Add to Cart
                                    </Button>
                                ) : (
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2, gap: 2 }}>
                                        <IconButton onClick={() => updateQuantity(item._id, item.quantity - 1,item.price)} disabled={item.quantity <= 1} color="primary" sx={{ bgcolor: item.quantity > 1 ? "#ff5722" : "#ccc", color: "white", "&:hover": { bgcolor: "#e64a19" } }}>
                                            <Remove />
                                        </IconButton>
                                        <Typography variant="h6">{item.quantity}</Typography>
                                        <IconButton onClick={() => updateQuantity(item._id, item.quantity + 1,item.price)} color="primary" sx={{ bgcolor: "#ff5722", color: "white", "&:hover": { bgcolor: "#e64a19" } }}>
                                            <Add />
                                        </IconButton>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Typography variant="body1" color="text.secondary">
                    No menu items available for this restaurant.
                </Typography>
            )}

            {/* ✅ Modal for Viewing Item Details */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
                    {selectedItem && (
                        <>
                            <CardMedia component="img" height="200" image={selectedItem.image || "https://via.placeholder.com/400x300"} alt={selectedItem.name} sx={{ borderRadius: 2, mb: 2 }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Typography variant="h6">{selectedItem.name}</Typography>
                                <IconButton onClick={handleCloseModal}>
                                    <Close />
                                </IconButton>
                            </Box>
                            <Typography sx={{ mb: 2 }}>{selectedItem.description}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                <Fastfood color="action" />
                                <Typography variant="body1">Category: {selectedItem.category}</Typography>
                            </Box>
                            <Button variant="contained" fullWidth sx={{ mt: 2 }} startIcon={<ShoppingCart />} onClick={() => handleAddToCart(selectedItem)}>
                                Add to Cart
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </Grid>
    );
};

export default MenuTab;
