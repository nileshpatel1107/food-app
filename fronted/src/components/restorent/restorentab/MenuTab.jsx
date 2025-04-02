import React, { useState, useOptimistic, startTransition } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, IconButton, Chip, Modal } from "@mui/material";
import { Add, Remove, ShoppingCart, LocalAtm, CheckCircle, Cancel, Close, Fastfood } from "@mui/icons-material";
import axios from "axios";

const MenuTab = ({ menu, restaurantName, cart }) => {

    const [usercart, setCart] = useState([cart]);

    const [selectedItem, setSelectedItem] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const userId = "67db80a5c58bdee5968bf217"; // Replace with actual user ID


    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedItem(null);
    };

    const handleAddToCart = async (item) => {
        console.log("Adding to cart:", item);

        const newQuantity = (cart[item._id] || 0) + 1; // Correctly calculate new quantity

        try {
            const response = await axios.put("http://localhost:5001/cart//addcart/67db80a5c58bdee5968bf217", {
                cartitems: { 
                    restaurantID: item.restaurantID, // Replace with actual restaurant ID
                    menuId: item._id, // Replace with actual menu ID
                    quantity:1,
                    amount: item.price, // Replace with actual amount
                    createdBy: userId, // Replace with actual user ID
                    cartId:"67ed05f7fda424ee8817c2de"
                 },
                userId: userId, // Replace with actual user ID

            });
            // Update cart state correctly
            setCart((prevCart) => ({
                ...prevCart,
                [item.quantity]: newQuantity, // Correct key usage
            }));

            console.log("Cart updated:", response.data);
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };



    const updateQuantity = async (menuId, newQuantity) => {


        try {
            await axios.put(`http://localhost:5001/api/cart/${menuId}`, { quantity: newQuantity });
            setCart((prevCart) => ({ ...prevCart, [menuId]: newQuantity }));
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };


    console.log("Cart state after adding:", cart);
    return (
        <Grid container spacing={2} justifyContent="center">
            {menu.length > 0 ? (
                menu.map((item) => {
                    console.log("Menu item:", item.quantity);
                    const quantity = item.quantity || 0;
                    console.log("Quantity:", quantity);
                    return (
                        <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{ width: 350, height: 420, display: "flex", flexDirection: "column", borderRadius: 3, boxShadow: 4, transition: "transform 0.3s ease-in-out", "&:hover": { transform: "scale(1.03)" } }}>
                                <CardMedia component="img" height="200" image={item.image || "https://via.placeholder.com/150"} alt={item.name} sx={{ objectFit: "cover", borderRadius: "4px 4px 0 0" }} />
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>{item.name}</Typography>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                        <Chip icon={<LocalAtm />} label={`₹${item.price}`} color="success" size="small" />
                                        {item.availability ? <Chip label="Available" color="primary" icon={<CheckCircle />} size="small" /> : <Chip label="Not Available" color="error" icon={<Cancel />} size="small" />}
                                    </Box>

                                    <Button variant="outlined" fullWidth sx={{ mt: 1 }} onClick={() => handleOpenModal(item)}>View Details</Button>

                                    {quantity === 0 ? (
                                        <Button variant="contained" fullWidth sx={{ mt: 1, bgcolor: "#ff5722", "&:hover": { bgcolor: "#e64a19" } }} onClick={() => handleAddToCart(item)} startIcon={<ShoppingCart />}>Add to Cart</Button>
                                    ) : (
                                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2, gap: 2 }}>
                                            <IconButton onClick={() => updateQuantity(item._id, quantity - 1)} disabled={quantity <= 1} color="primary" sx={{ bgcolor: quantity > 1 ? "#ff5722" : "#ccc", color: "white", "&:hover": { bgcolor: "#e64a19" } }}><Remove /></IconButton>
                                            <Typography variant="h6">{quantity}</Typography>
                                            <IconButton onClick={() => updateQuantity(item._id, quantity + 1)} color="primary" sx={{ bgcolor: "#ff5722", color: "white", "&:hover": { bgcolor: "#e64a19" } }}><Add /></IconButton>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })
            ) : (
                <Typography variant="body1" color="text.secondary">No menu items available for this restaurant.</Typography>
            )}

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
                    {selectedItem && (
                        <>
                            <CardMedia component="img" height="200" image={selectedItem.image || "https://via.placeholder.com/400x300"} alt={selectedItem.name} sx={{ borderRadius: 2, mb: 2 }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Typography variant="h6">{selectedItem.name}</Typography>
                                <IconButton onClick={handleCloseModal}><Close /></IconButton>
                            </Box>
                            <Typography sx={{ mb: 2 }}>{selectedItem.description}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}><Fastfood color="action" /><Typography variant="body1">Category: {selectedItem.category}</Typography></Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}><LocalAtm color="action" /><Typography variant="body1">Price: ₹{selectedItem.price}</Typography></Box>
                            <Button variant="contained" fullWidth sx={{ mt: 2 }} startIcon={<ShoppingCart />} onClick={() => handleAddToCart(selectedItem)}>Add to Cart</Button>
                        </>
                    )}
                </Box>
            </Modal>
        </Grid>
    );
};

export default MenuTab;
