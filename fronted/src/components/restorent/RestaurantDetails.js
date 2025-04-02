// src/components/RestaurantDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent, CardMedia, Box, Tabs, Tab } from "@mui/material";
import { LocationOn, Star, Fastfood, AccessTime, Call, Person, AttachMoney, CheckCircle, Cancel } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import MenuTab from "./restorentab/MenuTab";
import OrdersTab from "./restorentab/OrderTab";
import BookTableTab from "./restorentab/BookTableTab";
import ReviewsTab from "./restorentab/ReviewsTab";

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [menu, setMenu] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);


    //check in cart if item is already added or not
    const [cart, setCart] = useState([]);

    //api for get cart by userid
    const userId = "67db80a5c58bdee5968bf217"; // Replace with actual user ID
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/cart/getcart/67db80a5c58bdee5968bf217`);
                setCart(response.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchCart();
    }, []);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/restaurants/${id}`);
                setRestaurant(response.data);
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
                toast.error("Failed to load restaurant details!");
            }
        };

        const fetchMenu = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/restaurantmenu/${id}`);
                setMenu(response.data);
            } catch (error) {
                console.error("Error fetching menu:", error);
                toast.error("Failed to load menu!");
            }
        };

        fetchRestaurantDetails();
        fetchMenu();
    }, [id, cart]); // Fetch restaurant details and menu when `id` changes

    // Check if menu items are in the cart and set their quantities

    useEffect(() => {
        if (!cart || !cart.cartitems) return; // Ensure cart data exists
    
        setMenu((prevMenu) =>
            prevMenu.map((item) => {
                const cartItem = cart.cartitems.find((cartItem) => cartItem.menuId === item._id);
                console.log("match", cartItem);
                return {
                    ...item,
                    quantity: cartItem ? cartItem.quantity : 0, // Set quantity based on cart
                };
            })
        );
    }, [cart]); // 🔥 Only run when `cart` changes
 

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };



    console.log("menu", menu);
    if (!restaurant) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* Restaurant Details */}
            <Card sx={{ display: "flex", mb: 4, p: 2, borderRadius: 2, boxShadow: 3 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 400, height: 300, objectFit: "cover", borderRadius: 2 }}
                    image={restaurant.image || "https://source.unsplash.com/400x300/?restaurant,food"}
                    alt={restaurant.name}
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {restaurant.name}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
                        {/* Cuisine */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Fastfood color="primary" />
                            <Typography variant="h6">{restaurant.cuisine}</Typography>
                        </Box>

                        {/* Location */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LocationOn color="action" />
                            <Typography variant="body1" color="text.secondary">{restaurant.location}</Typography>
                        </Box>

                        {/* Rating */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Star color="warning" />
                            <Typography variant="body1">{restaurant.rating} / 5</Typography>
                        </Box>

                        {/* Price Range */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AttachMoney color="action" />
                            <Typography variant="body1" color="text.secondary">{restaurant.priceRange}</Typography>
                        </Box>

                        {/* Owner Name */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Person color="action" />
                            <Typography variant="body1" color="text.secondary">Owner: {restaurant.ownerName}</Typography>
                        </Box>

                        {/* Contact Number */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Call color="action" />
                            <Typography variant="body1" color="text.secondary">Contact: {restaurant.contactNumber}</Typography>
                        </Box>

                        {/* Opening Hours */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AccessTime color="action" />
                            <Typography variant="body1" color="text.secondary">Opens at {restaurant.openingHours}</Typography>
                        </Box>

                        {/* Status (Open or Closed) */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {restaurant.isOpen ? (
                                <CheckCircle color="success" />
                            ) : (
                                <Cancel color="error" />
                            )}
                            <Typography variant="body1">
                                {restaurant.isOpen ? "Open Now" : "Closed"}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">{restaurant.description}</Typography>
                </CardContent>
            </Card>

            {/* Tabs Section */}
            <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                <Tab label="Menu" />
                <Tab label="Order" />
                <Tab label="Book Table" />
                <Tab label="Review" />
            </Tabs>

            <Box sx={{ mt: 4 }}>
                {selectedTab === 0 && <MenuTab menu={menu} restaurantName={restaurant.name} cart={cart} />}
                {selectedTab === 1 && <OrdersTab />}  {/* Placeholder for Order tab */}
                {selectedTab === 2 && <BookTableTab restaurantId={restaurant.id} />}  {/* Placeholder for Book Table tab */}
                {selectedTab === 3 && <ReviewsTab />}  {/* Placeholder for Review tab */}
            </Box>
        </Container>
    );
};

export default RestaurantDetails;
