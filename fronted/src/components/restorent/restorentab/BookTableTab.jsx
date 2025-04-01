// src/components/RestaurantTableBooking.js
import React, { useState } from "react";
import {
    Container, Grid, TextField, Button, Typography, MenuItem,
    FormControl, InputLabel, Select, Box, CircularProgress
} from "@mui/material";
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { toast } from "react-hot-toast";
import axios from "axios";

const RestaurantTableBooking = ({ restaurantId }) => {
    const [numGuests, setNumGuests] = useState("");
    const [bookingDate, setBookingDate] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleBookingSubmit = async () => {
        if (!numGuests || !bookingDate) {
            toast.error("Please fill out all fields.");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`http://localhost:5001/bookings`, {
                restaurantId,
                numGuests,
                bookingDate
            });
            toast.success("Table booked successfully!");
        } catch (error) {
            console.error("Error booking table:", error);
            toast.error("Failed to book table. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Book a Table
            </Typography>

            <Grid container spacing={3}>
                {/* Number of Guests */}
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Number of Guests</InputLabel>
                        <Select
                            value={numGuests}
                            onChange={(e) => setNumGuests(e.target.value)}
                            label="Number of Guests"
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8+</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Booking Date and Time */}
                {/* <Grid item xs={12}>
                    <DateTimePicker
                        label="Booking Date & Time"
                        value={bookingDate}
                        onChange={(newValue) => setBookingDate(newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </Grid> */}

                {/* Submit Button */}
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleBookingSubmit}
                            >
                                Book Now
                            </Button>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default RestaurantTableBooking;
