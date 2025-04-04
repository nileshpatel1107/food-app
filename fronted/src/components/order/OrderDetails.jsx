import { useLocation } from "react-router-dom";
import { Box, Typography, Paper, Grid, Card, CardContent, Divider, Chip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import "./../../style/OrderDetails.css"; // Import CSS


const OrderDetails = () => {
  const location = useLocation();
  const { order } = location.state || {};
console.log(order);
  if (!order) {
    return <Typography variant="h5" className="error-text">Order not found!</Typography>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Confirmed":
        return "primary";
      case "Shipped":
        return "info";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box className="order-details-container">
      <Typography variant="h4" className="order-details-title">
        <ShoppingCartIcon fontSize="large" /> Order Details
      </Typography>
      
      {/* Order Info Line by Line */}
      <Paper elevation={3} className="order-details-card">
        <div className="order-info">
          <Typography><EventIcon /> <strong>Order ID:</strong> {order._id}</Typography>
          <Typography><EventIcon /> <strong>Order Date:</strong> {new Date(order.dateOfOrder).toLocaleString()}</Typography>
          <Typography><LocationOnIcon /> <strong>Address:</strong> {order.address}</Typography>
        </div>

        <Grid container spacing={2}>
          {/* Payment Details */}
          <Grid item xs={12}>
            <Typography><CreditCardIcon /> <strong>Payment Method:</strong> {order.paymentMethod}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography><PriceCheckIcon /> <strong>Total Amount:</strong> ${order.totalAmount}</Typography>
          </Grid>

          {/* Status Chips */}
          <Grid item xs={6}>
            <Chip
              label={`Status: ${order.status}`}
              color={getStatusColor(order.status)}
              className="status-chip"
            />
          </Grid>
          <Grid item xs={6}>
            <Chip
              label={`Payment: ${order.paymentStatus}`}
              color={order.paymentStatus === "Completed" ? "success" : "error"}
              className="status-chip"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Order Items Section */}
      <Typography variant="h5" className="order-items-title">
        <LocalShippingIcon /> Order Items
      </Typography>

      {/* {order.orderItems?.length > 0 ? (
        <div className="order-items-list">
          {order.orderItems.map((item, index) => (
            <Card className="order-item-card" key={index} elevation={4}>
              <CardContent>
                <Typography variant="h6"><strong>Item ID:</strong> {item}</Typography>
                <Divider className="card-divider" />
                <Typography variant="body2">Item details can be fetched separately</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Typography className="no-items-text">No order items found.</Typography>
      )} */}
    </Box>
  );
};

export default OrderDetails;
