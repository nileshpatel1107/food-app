import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, Typography, TextField, Button } from "@mui/material";
import { Toaster, ToastBar } from 'react-hot-toast'
import toast from 'react-hot-toast';
function LoginForm() {
    const navigate = useNavigate(); // Fixed this line

    const formik = useFormik({
        initialValues: {
            email: "nilpatel12345@gmail.com",
            password: "Nil12345",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email format").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                console.log("Entered", values);

                const response = await axios.post("http://localhost:5001/login", values);

                if (response.status === 201) {
                    localStorage.setItem("auth", response.data.token || "123"); // Store token
                    toast.success(response.data.message || "Login successful!", 2000);
                    resetForm();
                    navigate("/"); // Redirect to home/dashboard
                } else {
                    toast.error(response.data.message || "Something went wrong", 2000);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Login failed", 2000);
            }
        },
    });

    return (
        <Card sx={{ maxWidth: 400, margin: "2rem auto", padding: 2 }}>
            <CardHeader title="User Login" />
            <CardContent>
                <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        variant="outlined"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </form>
                <Toaster position="top-right" reverseOrder={false} />
            </CardContent>

        </Card>

    );
}

export default LoginForm;
