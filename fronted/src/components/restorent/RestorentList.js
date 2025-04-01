// React Grid Logic
import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import axios from "axios";
import { useEffect } from "react";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
ModuleRegistry.registerModules([AllCommunityModule]);

// Create new GridExample component
const RestorentList = () => {

    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();


    // Handle Edit button click
    const handleEdit = async (data) => {
        try {
            const response = await axios.get(`http://localhost:5001/restaurants/${data._id}`);
            console.log("Fetched Data:", response.data);
            
           // Navigate without showing ID in the URL
        navigate(`/restaurant/EditRestaurant`, { state: { restaurant: response.data } });

    
        } catch (error) {
            console.error("Error fetching restaurant details:", error);
        }
    };
    




    // Fetch restaurant list
    useEffect(() => {
        axios.get("http://localhost:5001/restaurants/restaurants")
            .then((response) => {
                console.log(response.data);
                setRestaurants(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        { field: "name", sortable: true, filter: true },
        { field: "location" },
        { field: "cuisine" },
        { field: "contactNumber" },
        { field: "rating" },
        {
            field: "actions",
            headerName: "Actions",
            cellRenderer: (params) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(params.data)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(`/details/${params.data.id}`)}
                    >
                        Details
                    </Button>
                </div>
            ),
        },
    ]);

    // Container: Defines the grid's theme & dimensions.
    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <AgGridReact rowData={restaurants} columnDefs={colDefs} />
        </div>
    );
};
export default RestorentList;