"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Card, CardContent, CardHeader, TextField, Button, MenuItem, Switch, FormControlLabel } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const priceRanges = ["₹", "₹₹", "₹₹₹", "₹₹₹₹"];

const validationSchema = Yup.object({
    name: Yup.string().required("Restaurant name is required"),
    ownerName: Yup.string().required("Owner name is required"),
    location: Yup.string().required("Location is required"),
    cuisine: Yup.string().required("Cuisine is required"),
    rating: Yup.number().min(0).max(5).required("Rating is required"),
    priceRange: Yup.string().required("Price range is required"),
    contactNumber: Yup.string().required("Contact number is required"),
    openingHours: Yup.string().required("Opening hours are required"),
    image: Yup.mixed().required("Image is required"),
});

const AddRestaurantForm = () => {
    const [image, setImage] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            ownerName: "",
            location: "",
            cuisine: "",
            rating: 0,
            priceRange: "₹₹",
            contactNumber: "",
            openingHours: "",
            isOpen: true,
            image: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("ownerName", values.ownerName);
                formData.append("location", values.location);
                formData.append("cuisine", values.cuisine);
                formData.append("rating", values.rating);
                formData.append("priceRange", values.priceRange);
                formData.append("contactNumber", values.contactNumber);
                formData.append("openingHours", values.openingHours);
                formData.append("isOpen", values.isOpen);
                if (image) formData.append("image", image); // Append image file

                await axios.post("http://localhost:5001/restaurants/addrestaurant", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                // toast.success("Restaurant added successfully!");
                resetForm();
                setImage(null);
            } catch (error) {
                // toast.error("Failed to add restaurant. Please try again.");
            }
        },
    });

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            console.log(file)
        }
    };

    return (
        <Card sx={{ maxWidth: 500, margin: "auto", p: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardHeader title="Add Restaurant" sx={{ textAlign: "center" }} />
            <CardContent>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Restaurant Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Owner Name"
                        name="ownerName"
                        value={formik.values.ownerName}
                        onChange={formik.handleChange}
                        error={formik.touched.ownerName && Boolean(formik.errors.ownerName)}
                        helperText={formik.touched.ownerName && formik.errors.ownerName}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Location"
                        name="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        error={formik.touched.location && Boolean(formik.errors.location)}
                        helperText={formik.touched.location && formik.errors.location}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Cuisine"
                        name="cuisine"
                        value={formik.values.cuisine}
                        onChange={formik.handleChange}
                        error={formik.touched.cuisine && Boolean(formik.errors.cuisine)}
                        helperText={formik.touched.cuisine && formik.errors.cuisine}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Rating"
                        name="rating"
                        type="number"
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                        error={formik.touched.rating && Boolean(formik.errors.rating)}
                        helperText={formik.touched.rating && formik.errors.rating}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        select
                        label="Price Range"
                        name="priceRange"
                        value={formik.values.priceRange}
                        onChange={formik.handleChange}
                    >
                        {priceRanges.map((range) => (
                            <MenuItem key={range} value={range}>
                                {range}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Contact Number"
                        name="contactNumber"
                        value={formik.values.contactNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                        helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Opening Hours"
                        name="openingHours"
                        value={formik.values.openingHours}
                        onChange={formik.handleChange}
                        error={formik.touched.openingHours && Boolean(formik.errors.openingHours)}
                        helperText={formik.touched.openingHours && formik.errors.openingHours}
                    />
                    <FormControlLabel
                        control={<Switch checked={formik.values.isOpen} onChange={formik.handleChange} name="isOpen" />}
                        label="Is Open"
                    />

                    {/* File Upload */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="upload-input"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="upload-input">
                            <Button variant="contained" component="span">
                                Choose Image
                            </Button>
                        </label>
                        <span>{image ? image.name : "No file chosen"}</span>
                    </div>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Add Restaurant
                    </Button>
                </form>
                {/* <ToastContainer position="top-right" autoClose={3000} /> */}
            </CardContent>
        </Card>
    );
};

export default AddRestaurantForm;
