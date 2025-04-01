// src/components/ReviewsTab.js
import React from "react";
import { Typography, Divider } from "@mui/material";

const ReviewsTab = () => {
    return (
        <div>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Reviews
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
                Reviews section coming soon!
            </Typography>
        </div>
    );
};

export default ReviewsTab
