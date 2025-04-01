
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
} from "@mui/material";
// import { toast } from "react-toastify";

const AddMenu = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [fileName, setFileName] = useState("Choose file");
    const [menuData, setMenuData] = useState({
        restaurantID: "",
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        availability: true,
    });
    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile)
        if (selectedFile) {
            setFileName(selectedFile);

        }
    };





    // Fetch restaurant list
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get("http://localhost:5001/restaurants/restaurants");
                console.log(response)
                setRestaurants(response.data);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
                // toast.error("Failed to load restaurants!");
            }
        };

        fetchRestaurants();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMenuData((prev) => ({ ...prev, [name]: value }));
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            if (!menuData.restaurantID || !menuData.name || !menuData.price) {
                console.error("Required fields are missing.");
                return;
            }

            formData.append("restaurantID", menuData.restaurantID || "");
            formData.append("name", menuData.name || "");
            formData.append("description", menuData.description || "");
            formData.append("price", menuData.price || "");
            formData.append("category", menuData.category || "");
            formData.append("availability", menuData.availability || "");
            formData.append("image", fileName || "")
            // Debugging FormData
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            console.log(formData)
            try {
                // const response = await axios.post("http://localhost:5001/restaurantmenu/", formData, {
                //     headers: { "Content-Type": "multipart/form-data" },
                // });

                // const data = await response.json();
                // console.log(data)
                const config = {
                    "Content-Type": "multipart/form-data"
                }
                const res = await axios.post("http://localhost:5001/restaurantmenu/", formData, config);
                console.log(res)


                // if (response.status) {
                //     alert("Image uploaded successfully!");
                // } else {
                //     alert(data.message || "Upload failed");
                // }
            } catch (error) {
                console.error("Upload error:", error);
                // alert("Error uploading image");
            }



            // Reset form after submission
            // setMenuData({
            //     restaurantID: "",
            //     name: "",
            //     description: "",
            //     price: "",
            //     image: "",
            //     category: "",
            //     availability: true,
            // });
        } catch (error) {
            console.error("Error adding menu item:", error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 400,
                margin: "auto",
                mt: 4,
            }}
        >
            <Typography variant="h5" gutterBottom>
                Add Menu Item
            </Typography>

            {/* Restaurant Dropdown */}
            <FormControl fullWidth>
                <InputLabel>Restaurant</InputLabel>
                <Select
                    name="restaurantID"
                    value={menuData.restaurantID}
                    onChange={handleChange}
                    label="Restaurant"
                    required
                >
                    {restaurants.map((restaurant) => (
                        <MenuItem key={restaurant._id} value={restaurant._id}>
                            {restaurant.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Name"
                name="name"
                value={menuData.name}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Description"
                name="description"
                value={menuData.description}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Price"
                name="price"
                type="number"
                value={menuData.price}
                onChange={handleChange}
                fullWidth
                required
            />



            {/* File Upload */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <TextField variant="outlined" fullWidth disabled value={fileName} sx={{ flexGrow: 1 }} />
                <input type="file" accept="image/*" style={{ display: "none" }} id="upload-input" onChange={handleFileChange} />
                <label htmlFor="upload-input">
                    <Button variant="contained" component="span">
                        Choose File
                    </Button>
                </label>
            </div>

            {/* Category Dropdown */}
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    name="category"
                    value={menuData.category}
                    onChange={handleChange}
                    label="Category"
                    required
                >
                    <MenuItem value="Appetizer">Appetizer</MenuItem>
                    <MenuItem value="Main Course">Main Course</MenuItem>
                    <MenuItem value="Dessert">Dessert</MenuItem>
                    <MenuItem value="Beverage">Beverage</MenuItem>
                </Select>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Add Menu
            </Button>
        </Box>
    );
};

export default AddMenu;
