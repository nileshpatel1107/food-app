const express = require("express");
const connectDB = require("./db/connection.js");
require("dotenv").config();
const User = require('./module/user.model.js')
const userRoutes = require('./routes/userRoutes.js')
const dashboardRoutes = require('./routes/dashboardRoutes.js')
const restaurantsRoutes = require('./routes/restaurantsRoutes.js')
const restaurantMenuRoutes = require('./routes/restaurantMenuRoutes.js')
const cartRoutes = require('./routes/cartRoutes.js')
const discountRoutes = require("./routes/discountRoutes.js")
const orderRoutes = require("./routes/orderRoutes.js")
const userAddressRoutes = require("./routes/userAddressRoutes.js")
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();
// Enable CORS for all origins
app.use(cors());

// Your other middleware and routes
app.use(express.json());


app.use("/", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/restaurants", restaurantsRoutes);
app.use("/restaurantmenu", restaurantMenuRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/discount",discountRoutes );
app.use("/useraddress", userAddressRoutes);

// Sample route
app.get("/", async (req, res) => {

    res.send("Hello, World!");
    // const newUser = new User({ name: "Nil", email: "nisl1@gmaiol.com", password: "124@123" });
    // await newUser.save();
    //console.log("created")

});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
