require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dbController = require("./routes/dbRoutes")

const app = express();
const PORT = process.env.PORT || 3031;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/api", dbController);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);