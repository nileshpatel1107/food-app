// src/components/OrdersTab.js
import React from "react";
import { Typography, Divider } from "@mui/material";

const OrdersTab = () => {
    return (
        <div>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Orders
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
                Order functionality coming soon!
            </Typography>
        </div>
    );
};

export default OrdersTab;
