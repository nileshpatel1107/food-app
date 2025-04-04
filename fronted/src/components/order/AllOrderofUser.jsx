import { useEffect, useState,React } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import React Router
import { createRoot } from "react-dom/client";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import toast from "react-hot-toast";
ModuleRegistry.registerModules([AllCommunityModule]);
const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrders = async () => {
            const fetchPromise = axios.get("http://localhost:5001/order/", {
                params: { createdBy: "67db80a5c58bdee5968bf217" },
            });

            toast.promise(fetchPromise, {
                loading: "Fetching orders...",
                success: "Orders loaded successfully!",
                error: "Failed to fetch orders!",
            });

            try {
                const response = await fetchPromise;
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

// Status cell with colored styling
const StatusCellRenderer = (props) => {
    const status = props.value;

    // Define color based on status
    const statusColors = {
        Pending: "red",
        Confirmed: "blue",
        Shipped: "orange",
        Delivered: "green",
        Completed: "green",
        Cancelled: "gray",
    };

    return (
        <span style={{ color: statusColors[status] || "black", fontWeight: "bold" }}>
            {status}
        </span>
    );
};

    // Column Definitions
    const colDefs = [
        { field: "_id", headerName: "Order ID", flex: 2 },
        { field: "restaurantId", headerName: "Restaurant ID", flex: 2 },
        { field: "address", headerName: "Delivery Address", flex: 2 },
        { field: "paymentMethod", headerName: "Payment Method", flex: 1 },
        { field: "totalAmount", headerName: "Total Amount ($)", flex: 1 },
        { 
            field: "status", 
            headerName: "Order Status", 
            flex: 1,
            cellRenderer: StatusCellRenderer, // Use React component
        },
        { field: "paymentStatus", headerName: "Payment Status", flex: 1 },
        { field: "dateOfOrder", headerName: "Date Ordered", flex: 2 },
    ];

    const defaultColDef = {
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        headerClass: "custom-header", // Apply CSS class to headers
        cellStyle: { textAlign: "center" }, // Center-align row data
    };



    // ✅ Handle Row Click: Pass Order as Props
    const onCellClicked = (params) => {
        const order = params.data;
        
        navigate(`/order/orderdetails`, { state: { order } }); // ✅ Pass order as state
    };
    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Order List</h1>

            <div style={{ width: "100%", height: "80vh" }} className="ag-theme-alpine">
                <AgGridReact
                    rowData={orders}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={10}
                    onCellClicked={onCellClicked} // ✅ Handle Click Event
                />
            </div>
        </div>
    );
};

export default OrderList;
