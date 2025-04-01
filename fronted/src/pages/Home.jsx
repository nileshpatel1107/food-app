import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Card, CardContent, CardMedia, Grid, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import toast from "react-hot-toast";

function Home() {
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch restaurant list
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get("http://localhost:5001/restaurants/restaurants");
                setRestaurants(response.data);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
                toast.error("Failed to load restaurants!");
            }
        };

        fetchRestaurants();
    }, []);

    // Filtered restaurant list
    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>

            {/* Hero Section */}

            <div
                style={{
                    textAlign: "center",
                    backgroundImage: "url(https://source.unsplash.com/1600x900/?food,restaurant)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "60px 20px",
                    borderRadius: "15px",
                    color: "#fff",
                }}
            >
                <Typography variant="h3" fontWeight="bold">
                    Discover the best food & drinks in Your City
                </Typography>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search for restaurant, cuisine or a dish"
                        fullWidth
                        sx={{
                            maxWidth: 500,
                            backgroundColor: "#fff",
                            borderRadius: "5px",
                        }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ ml: 2, px: 3, borderRadius: "5px" }}
                    >
                        Search
                    </Button>
                </div>
            </div>

            {/* Restaurant List - Responsive Grid */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "30px",
                }}
            >
                {filteredRestaurants.map((restaurant) => (
                    <Card
                        key={restaurant.id}
                        sx={{
                            width: "300px",
                            borderRadius: "15px",
                            boxShadow: 3,
                            transition: "transform 0.3s",
                            "&:hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="200"
                            image={restaurant.image || "https://source.unsplash.com/400x300/?restaurant,food"}
                            alt={restaurant.name}
                            sx={{
                                objectFit: "cover",
                                borderTopLeftRadius: "15px",
                                borderTopRightRadius: "15px",
                            }}
                        />
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold">{restaurant.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{restaurant.cuisine}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Container>
    );
}

export default Home;
