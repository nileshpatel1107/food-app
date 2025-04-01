const express = require("express");
const User = require("../module/user.model");

const router = express.Router();


//Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


// User registration
router.post("/register", async (req, res) => {
    try {
        console.log("enter");
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();
        console.log("User registered successfully");
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error occurred:", error.message);
        return res.status(500).json({ error: error.message });
    }
});


// User login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email)
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log("not mathes")
            return res.status(400).json({ message: "Invalid email or password" });
        }
        console.log("matched")
        // Generate JWT Token
        // const token = jwt.sign(
        //     { userId: user._id, name: user.name, email: user.email },
        //     // process.env.JWT_SECRET,
        //     { expiresIn: "1h" } // Token expires in 1 hour
        // );

        res.status(201).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





module.exports = router;
