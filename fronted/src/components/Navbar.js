import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function Navbar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <List>
            <ListItem button component={Link} to="/">
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/login">
                <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/signup">
                <ListItemText primary="Signup" />
            </ListItem>
        </List>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ display: { sm: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }} component={Link} to="/">
                        FoodApp
                    </Typography>
                    <Button color="inherit" component={Link} to="/login" sx={{ display: { xs: "none", sm: "block" } }}>Login</Button>
                    <Button color="inherit" component={Link} to="/signup" sx={{ display: { xs: "none", sm: "block" } }}>Signup</Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} sx={{ display: { sm: "none" } }}>
                {drawer}
            </Drawer>
        </>
    );
}

export default Navbar;