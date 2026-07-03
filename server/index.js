const express = require("express");
const app = express();
const port = 4000;

require("dotenv").config();
const connectDB = require("./db");

connectDB();

app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});