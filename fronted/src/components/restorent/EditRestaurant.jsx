import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const EditRestaurant = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const restaurant = location.state?.restaurant || {}; // Get restaurant data from props

  const [formData, setFormData] = useState(restaurant);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    
    try {
      await axios.put(`http://localhost:5001/restaurants/${id}`, formData);
      navigate(-1); // Navigate back
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5" gutterBottom>
          Edit Restaurant
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" name="name" value={formData.name || ""} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Location" name="location" value={formData.location || ""} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Cuisine" name="cuisine" value={formData.cuisine || ""} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Contact Number" name="contactNumber" value={formData.contactNumber || ""} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Rating" name="rating" type="number" value={formData.rating || ""} onChange={handleChange} fullWidth margin="normal" required />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Changes
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditRestaurant;
