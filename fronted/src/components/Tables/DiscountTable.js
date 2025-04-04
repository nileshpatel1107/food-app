import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    MenuItem,
    Grid,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    getDiscounts,
    createDiscount,
    updateDiscount,
    deleteDiscount,
} from '../../services/discountService';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

// ✅ Separate Action Button Renderer Component
const ActionButtons = ({ data, onView, onEdit, onDelete }) => (
    <>
        <IconButton onClick={() => onView(data)} color="info">
            <VisibilityIcon />
        </IconButton>
        <IconButton onClick={() => onEdit(data)} color="primary">
            <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(data._id)} color="error">
            <DeleteIcon />
        </IconButton>
    </>
);

const DiscountTable = () => {
    const [discounts, setDiscounts] = useState([]);
    const [formData, setFormData] = useState({
        restaurantId: '67def69d367a457fd2939632',
        from: '',
        to: '',
        type: 'flat',
        value: '',
        couponCode: '',
        createdBy: '660d6b5e3f1a5c42dc0f0a2c',
    });
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState(null);

    const fetchDiscounts = async () => {
        try {
            const response = await getDiscounts();
            setDiscounts(response.data);
        } catch (error) {
            console.error('Error fetching discounts', error);
        }
    };

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const handleDelete = async (id) => {
        await deleteDiscount(id);
        console.log(id);

        fetchDiscounts();
    };

    const handleEdit = (discount) => {
        setFormData(discount);
        setEditModalOpen(true);
    };

    const handleView = (discount) => {
        setSelectedDiscount(discount);
        setViewModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData._id) {
            await updateDiscount(formData._id, formData);
        } else {
            await createDiscount(formData);
        }
        setEditModalOpen(false);
        fetchDiscounts();
        setFormData({
            restaurantId: '67def69d367a457fd2939632',
            from: '',
            to: '',
            type: 'flat',
            value: '',
            couponCode: '',
            createdBy: '660d6b5e3f1a5c42dc0f0a2c',
        });
    };

    const columnDefs = [
        {
            headerName: "Restaurant",
            field: "restaurantId.name",
            valueGetter: (params) => params.data.restaurantId?.name || "-",
            sortable: true,
            filter: true,
        },
        {
            headerName: "Coupon Code",
            field: "couponCode",
            sortable: true,
            filter: true,
        },
        {
            headerName: "Type",
            field: "type",
            sortable: true,
            filter: true,
            cellRenderer: (params) =>
                params.value.charAt(0).toUpperCase() + params.value.slice(1),
        },
        {
            headerName: "Value",
            field: "value",
            sortable: true,
            filter: true,
            valueFormatter: (params) =>
                params.data.type === "percentage"
                    ? `${params.value}%`
                    : `₹${params.value}`,
        },
        {
            headerName: "Max Discount",
            field: "maxDiscount",
            sortable: true,
            filter: true,
            valueFormatter: (params) => `₹${params.value}`,
        },
        {
            headerName: "Times Usable",
            field: "numberOfTimesApply",
            sortable: true,
            filter: true,
        },
        {
            headerName: "Valid From",
            field: "from",
            sortable: true,
            filter: true,
            valueFormatter: (params) =>
                new Date(params.value).toLocaleDateString("en-IN"),
        },
        {
            headerName: "Valid To",
            field: "to",
            sortable: true,
            filter: true,
            valueFormatter: (params) =>
                new Date(params.value).toLocaleDateString("en-IN"),
        },
        {
            headerName: "Status",
            field: "isDeleted",
            cellRenderer: (params) =>
                params.value ? "Inactive" : "Active",
            cellStyle: (params) => ({
                color: params.value ? "red" : "green",
                fontWeight: "bold",
            }),
        },
        {
            headerName: "Actions",
            field: "actions",
            cellRenderer: (params) => (
                <ActionButtons
                    data={params.data}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        },
    ];

    const defaultColDef = {
        flex: 1,
        resizable: true,
    };

    return (
        <>
            <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Discount Coupons</h2>
                    <Button variant="contained" color="primary" onClick={() => setEditModalOpen(true)}>
                        Add Discount
                    </Button>
                </div>

                <AgGridReact
                    rowData={discounts}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                />
            </div>

            {/* Edit Modal */}
            <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                <Box sx={style}>
                    <Typography variant="h6" gutterBottom>
                        {formData._id ? 'Edit Discount' : 'Add Discount'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Coupon Code" value={formData.couponCode}
                                    onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="number" fullWidth label="Value" value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: e.target.value })} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField select fullWidth label="Type" value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                    <MenuItem value="flat">Flat</MenuItem>
                                    <MenuItem value="percentage">Percentage</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="date" fullWidth label="Valid From" InputLabelProps={{ shrink: true }}
                                    value={formData.from}
                                    onChange={(e) => setFormData({ ...formData, from: e.target.value })} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="date" fullWidth label="Valid To" InputLabelProps={{ shrink: true }}
                                    value={formData.to}
                                    onChange={(e) => setFormData({ ...formData, to: e.target.value })} required />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth type="submit" variant="contained" color="success">
                                    {formData._id ? 'Update' : 'Create'} Discount
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>

            {/* View Modal */}
            <Modal open={viewModalOpen} onClose={() => setViewModalOpen(false)}>
                <Box sx={style}>
                    <Typography variant="h6" gutterBottom>Discount Details</Typography>
                    {selectedDiscount && (
                        <>
                            <Typography><strong>Coupon:</strong> {selectedDiscount.couponCode}</Typography>
                            <Typography><strong>Type:</strong> {selectedDiscount.type}</Typography>
                            <Typography><strong>Value:</strong> {selectedDiscount.value}</Typography>
                            <Typography><strong>Valid From:</strong> {selectedDiscount.from}</Typography>
                            <Typography><strong>Valid To:</strong> {selectedDiscount.to}</Typography>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default DiscountTable;
