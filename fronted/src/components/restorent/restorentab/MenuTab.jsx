import React, { useState, useOptimistic, startTransition } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, IconButton, Chip, Modal } from "@mui/material";
import { Add, Remove, ShoppingCart, LocalAtm, CheckCircle, Cancel, Close, Fastfood } from "@mui/icons-material";
import axios from "axios";

const MenuTab = ({ menu, restaurantName }) => {
    console.log(menu);
    const [cart, setCart] = useState(
        menu.reduce((acc, item) => {
            acc[item._id] = item.quantity || 0; // Initialize from menu props
            return acc;
        }, {})
    );
    console.log(cart);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    // Optimistic state for cart quantity
    const [optimisticCart, updateOptimisticCart] = useOptimistic(cart, (prevCart, { menuId, newQuantity }) => {
        return { ...prevCart, [menuId]: newQuantity };
    });

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedItem(null);
    };

    const handleAddToCart = async (item) => {
        startTransition(() => {
            updateOptimisticCart({ menuId: item._id, newQuantity: 1 });
        });
        console.log("Adding to cart:", item.name);
        try {
            await axios.post("http://localhost:5001/cart/67ebb76362b8558156c78142/item", {
                "menuId": "67e8e8bc1c82b97b7927a7e4",
                "amount": 200,
                "quantity": 2,
                "createdBy": "67db80a5c58bdee5968bf217"
            }
            );

            setCart((prevCart) => ({
                ...prevCart,
                [item._id]: 1,
            }));
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const updateQuantity = async (menuId, newQuantity) => {
        startTransition(() => {
            updateOptimisticCart({ menuId, newQuantity });
        });

        try {
            await axios.put(`http://localhost:5001/api/cart/${menuId}`, { quantity: newQuantity });
            setCart((prevCart) => ({ ...prevCart, [menuId]: newQuantity }));
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    return (
        <Grid container spacing={2} justifyContent="center">
            {menu.length > 0 ? (
                menu.map((item) => {
                    const quantity = optimisticCart[item._id] || 0;

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
