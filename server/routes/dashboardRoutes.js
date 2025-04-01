const express = require("express");
const router = express.Router();
// User registration
router.get("/", async (req, res) => {
    try {
        console.log("enter");

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error occurred:", error.message);
        return res.status(500).json({ error: error.message });
    }
});
module.exports = router;
