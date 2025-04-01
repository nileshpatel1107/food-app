import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Rating,
    Divider,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    TextField,
    InputAdornment
} from "@mui/material";
import {
    Search,
    FilterList,
    Star,
    AccessTime,
    LocalOffer,
    ArrowRightAlt,
    FavoriteBorder
} from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const RestaurantLayout = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        cuisine: "",
        priceRange: [0, 4],
        rating: 0,
        sortBy: "recommended",
        searchQuery: ""
    });
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5001/restaurants/restaurants");
                setRestaurants(response.data);
                setFilteredRestaurants(response.data);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
                toast.error("Failed to load restaurants!");
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    useEffect(() => {
        // Apply filters
        let result = [...restaurants];

        // Search filter
        if (filters.searchQuery) {
            result = result.filter(
                restaurant =>
                    restaurant.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                    restaurant.cuisine.toLowerCase().includes(filters.searchQuery.toLowerCase())
            );
        }

        // Cuisine filter
        if (filters.cuisine) {
            result = result.filter(restaurant =>
                restaurant.cuisine.includes(filters.cuisine)
            );
        }

        // Rating filter
        if (filters.rating > 0) {
            result = result.filter(restaurant =>
                parseFloat(restaurant.rating) >= filters.rating
            );
        }

        // Price range filter
        result = result.filter(restaurant => {
            const priceLevel = restaurant.priceRange.split('$').length - 1;
            return priceLevel >= filters.priceRange[0] && priceLevel <= filters.priceRange[1];
        });

        // Sorting
        switch (filters.sortBy) {
            case "rating":
                result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                break;
            case "delivery-time":
                result.sort((a, b) => {
                    const timeA = parseInt(a.deliveryTime || "30");
                    const timeB = parseInt(b.deliveryTime || "30");
                    return timeA - timeB;
                });
                break;
            case "price-low":
                result.sort((a, b) => {
                    const priceA = a.priceRange.split('$').length - 1;
                    const priceB = b.priceRange.split('$').length - 1;
                    return priceA - priceB;
                });
                break;
            case "price-high":
                result.sort((a, b) => {
                    const priceA = a.priceRange.split('$').length - 1;
                    const priceB = b.priceRange.split('$').length - 1;
                    return priceB - priceA;
                });
                break;
            default:
                // Keep original order for "recommended"
                break;
        }

        setFilteredRestaurants(result);
    }, [filters, restaurants]);

    const handleFilterChange = (name, value) => {
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const cuisineOptions = ["Italian", "Chinese", "Indian", "Thai", "Mexican", "Japanese"];

    // Get a random delivery time between 20-40 minutes for demo
    const getRandomDeliveryTime = () => {
        return Math.floor(Math.random() * (40 - 20 + 1) + 20);
    };

    // Get random discount for demo
    const getRandomDiscount = () => {
        const discounts = ["50% OFF up to ₹100", "FREE DELIVERY", "20% OFF", "Buy 1 Get 1"];
        return discounts[Math.floor(Math.random() * discounts.length)];
    };

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            {/* Page Title */}
            <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 3 }}>
                Restaurants with online food delivery
            </Typography>

            {/* Search & Filter Bar */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <TextField
                        fullWidth
                        placeholder="Search for restaurants and food"
                        variant="outlined"
                        value={filters.searchQuery}
                        onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 2 }
                        }}
                    />
                    <Button
                        variant="outlined"
                        startIcon={<FilterList />}
                        onClick={toggleFilters}
                        sx={{ ml: 2, height: 56, borderRadius: 2 }}
                    >
                        Filters
                    </Button>
                </Box>

                {/* Expanded Filters */}
                {showFilters && (
                    <Box sx={{ p: 3, bgcolor: "#f8f8f8", borderRadius: 2, mb: 3 }}>
                        <Grid container spacing={3}>
                            {/* Cuisine Filter */}
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Cuisine</InputLabel>
                                    <Select
                                        value={filters.cuisine}
                                        onChange={(e) => handleFilterChange("cuisine", e.target.value)}
                                        label="Cuisine"
                                    >
                                        <MenuItem value="">All Cuisines</MenuItem>
                                        {cuisineOptions.map((cuisine) => (
                                            <MenuItem key={cuisine} value={cuisine}>{cuisine}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Rating Filter */}
                            <Grid item xs={12} md={4}>
                                <Box>
                                    <Typography gutterBottom>Minimum Rating</Typography>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Rating
                                            value={filters.rating}
                                            onChange={(_, newValue) => handleFilterChange("rating", newValue)}
                                            precision={0.5}
                                        />
                                        <Typography sx={{ ml: 1 }}>
                                            {filters.rating > 0 ? `${filters.rating}+` : "Any Rating"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            {/* Sort By */}
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={filters.sortBy}
                                        onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                                        label="Sort By"
                                    >
                                        <MenuItem value="recommended">Recommended</MenuItem>
                                        <MenuItem value="rating">Rating: High to Low</MenuItem>
                                        <MenuItem value="delivery-time">Delivery Time</MenuItem>
                                        <MenuItem value="price-low">Price: Low to High</MenuItem>
                                        <MenuItem value="price-high">Price: High to Low</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Price Range */}
                            <Grid item xs={12}>
                                <Typography gutterBottom>Price Range</Typography>
                                <Box sx={{ px: 2 }}>
                                    <Slider
                                        value={filters.priceRange}
                                        onChange={(_, newValue) => handleFilterChange("priceRange", newValue)}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={4}
                                        marks={[
                                            { value: 0, label: '$' },
                                            { value: 1, label: '$$' },
                                            { value: 2, label: '$$$' },
                                            { value: 3, label: '$$$$' },
                                            { value: 4, label: '$$$$$' },
                                        ]}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/* Quick Filters */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    <Chip
                        label="All"
                        color={!filters.cuisine && filters.rating === 0 ? "primary" : "default"}
                        onClick={() => {
                            setFilters({ ...filters, cuisine: "", rating: 0 });
                        }}
                    />
                    {cuisineOptions.map(cuisine => (
                        <Chip
                            key={cuisine}
                            label={cuisine}
                            color={filters.cuisine === cuisine ? "primary" : "default"}
                            onClick={() => handleFilterChange("cuisine", cuisine === filters.cuisine ? "" : cuisine)}
                        />
                    ))}
                    <Chip
                        label="4.0+"
                        icon={<Star sx={{ fontSize: 16 }} />}
                        color={filters.rating >= 4 ? "primary" : "default"}
                        onClick={() => handleFilterChange("rating", filters.rating >= 4 ? 0 : 4)}
                    />
                    <Chip
                        label="Fast Delivery"
                        color={filters.sortBy === "delivery-time" ? "primary" : "default"}
                        onClick={() => handleFilterChange("sortBy", filters.sortBy === "delivery-time" ? "recommended" : "delivery-time")}
                    />
                </Box>
            </Box>

            {/* Restaurant Cards */}
            {loading ? (
                <Typography>Loading restaurants...</Typography>
            ) : filteredRestaurants.length === 0 ? (
                <Typography>No restaurants found matching your criteria.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {filteredRestaurants.map((restaurant) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
                            <Link to={`/details/${restaurant._id}`} style={{ textDecoration: 'none' }}>
                                <Card className="restaurant-card" sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 3,
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={restaurant.image || "https://source.unsplash.com/400x300/?restaurant,food"}
                                            alt={restaurant.name}
                                            sx={{
                                                borderTopLeftRadius: 12,
                                                borderTopRightRadius: 12
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                borderRadius: '50%',
                                                bgcolor: 'white',
                                                width: 36,
                                                height: 36,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <FavoriteBorder sx={{ color: '#757575' }} />
                                        </Box>
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                width: '100%',
                                                bgcolor: 'rgba(0,0,0,0.7)',
                                                color: 'white',
                                                p: 1
                                            }}
                                        >
                                            <Typography variant="body2" fontWeight="bold">
                                                {getRandomDiscount()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1, pt: 2, pb: '16px !important' }}>
                                        <Typography variant="h6" component="div" fontWeight="bold" noWrap>
                                            {restaurant.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, mb: 1 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    bgcolor: '#48c479',
                                                    color: 'white',
                                                    px: 0.8,
                                                    py: 0.3,
                                                    borderRadius: 1,
                                                    mr: 1,
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                <Typography fontSize="inherit" fontWeight="bold">{restaurant.rating}</Typography>
                                                <Star sx={{ ml: 0.5, fontSize: 14 }} />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {restaurant.reviewCount || "200+"} ratings
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {restaurant.cuisine}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {restaurant.location}
                                        </Typography>
                                        <Divider sx={{ my: 1.5 }} />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <AccessTime sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    {restaurant.deliveryTime || getRandomDeliveryTime()} min
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {restaurant.priceRange}
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            mt: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            opacity: 0.7,
                                            transition: 'opacity 0.3s',
                                            '&:hover': { opacity: 1 }
                                        }}>
                                            <Typography variant="body2" color="primary" fontWeight="medium">
                                                VIEW RESTAURANT
                                            </Typography>
                                            <ArrowRightAlt color="primary" fontSize="small" sx={{ ml: 0.5 }} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default RestaurantLayout;