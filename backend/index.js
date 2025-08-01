const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/api",adminRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

