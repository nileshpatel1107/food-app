// src/components/RestaurantDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Container, Typography, Card, CardContent, CardMedia, Grid, Box, Divider, Chip, Tabs, Tab
} from "@mui/material";
import { LocationOn, Star, Fastfood, AccessTime, Call, Person, AttachMoney, CheckCircle, Cancel, LocalAtm } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";

function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [menu, setMenu] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0); // State for Tabs
    console.log(id)
    console.log(restaurant)
    console.log(menu)
    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/restaurants/${id}`);
                setRestaurant(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
                toast.error("Failed to load restaurant details!");
            }
        };

        const fetchMenu = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/restaurantmenu/${id}`);
                setMenu(response.data);
                console.log(menu)
            } catch (error) {
                console.error("Error fetching menu:", error);
                toast.error("Failed to load menu!");
            }
        };

        fetchRestaurantDetails();
        fetchMenu();
    }, [id]);

    if (!restaurant) {
        return <Typography>Loading...</Typography>;
    }

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* Restaurant Details */}
            <Card sx={{ display: "flex", mb: 4, borderRadius: 2, boxShadow: 3, flexDirection: { xs: "column", md: "row" } }}>
                <CardMedia
                    component="img"
                    sx={{
                        width: { xs: '100%', md: 400 }, // Full width on smaller screens, fixed on medium and larger
                        height: { xs: 250, md: 'auto' }, // Set a height on smaller screens, but auto on medium and larger
                        objectFit: "cover",
                        borderRadius: { xs: '2px 2px 0 0', md: '2px' } // Rounded corners 
                    }}
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
            <Tabs value={selectedTab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
                <Tab label="Menu" />
                <Tab label="Orders" />
                <Tab label="Book Table" />
                <Tab label="Reviews" />
            </Tabs>

            {/* Tab Panels */}
            {selectedTab === 0 && (
                <Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Menu
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    {menu.length > 0 ? (
                        <Grid container spacing={2}>
                            {menu.map((item) => (
                                <Grid item key={item._id} xs={12} sm={6} md={4}>
                                    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                                        <CardContent>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                                                <Chip
                                                    icon={<LocalAtm />}
                                                    label={`$${item.price}`}
                                                    color="success"
                                                    size="small"
                                                />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                {item.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            No menu items available for this restaurant.
                        </Typography>
                    )}
                </Box>
            )}

            {selectedTab === 1 && (
                <Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Orders
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                        Order functionality coming soon!
                    </Typography>
                </Box>
            )}

            {selectedTab === 2 && (
                <Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Book a Table
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                        Table booking functionality coming soon!
                    </Typography>
                </Box>
            )}

            {selectedTab === 3 && (
                <Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Reviews
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                        Reviews section coming soon!
                    </Typography>
                </Box>
            )}
        </Container>
    );
}

export default RestaurantDetails;
